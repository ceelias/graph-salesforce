import {
  mutations,
  Recording,
  RecordingEntry,
  setupRecording,
  SetupRecordingInput,
} from '@jupiterone/integration-sdk-testing';
import { isJson } from '../../src/utils/isJson';

export { Recording };

export const salesforceMutations = {
  ...mutations,
  mutateAccessToken,
};

export function setupSalesforceRecording(
  input: SetupRecordingInput,
): Recording {
  return setupRecording({
    mutateEntry: mutateRecordingEntry,
    ...input,
    // recordFailedRequests: true,
  });
}

function mutateRecordingEntry(entry: RecordingEntry): void {
  salesforceMutations.unzipGzippedRecordingEntry(entry);
  salesforceMutations.mutateAccessToken(entry, () => '[REDACTED]');
}

function mutateAccessToken(
  entry: RecordingEntry,
  mutation: (accessToken: string) => string,
) {
  const responseText = entry.response.content.text;
  if (!responseText) {
    return;
  }

  if (isJson(responseText)) {
    const responseJson = JSON.parse(responseText);

    if (/login/.exec(entry.request.url) && entry.request.postData) {
      // Redact request body with secrets for authentication
      entry.request.postData.text = '[REDACTED]';

      // Redact authentication response token
      if (responseJson.access_token) {
        entry.response.content.text = JSON.stringify(
          {
            ...responseJson,
            access_token: mutation(responseJson.access_token),
          },
          null,
          0,
        );
      }
    }
  }
}
