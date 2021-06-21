# Integration with JupiterOne

## Salesforce + JupiterOne Integration Benefits

- Visualize Salesforce users, roles, groups, policies, and permissions in the
  JupiterOne graph.
- Map Salesforce users to employees in your JupiterOne account.
- Monitor changes to Salesforce users using JupiterOne alerts.

## How it Works

- JupiterOne periodically fetches users, roles, groups, policies, and
  permissions from Salesforce to update the graph.
- Write JupiterOne queries to review and monitor updates to the graph, or
  leverage existing queries.
- Configure alerts to take action when JupiterOne graph changes, or leverage
  existing alerts.

## Requirements

- Salesforce supports the OAuth2 Web Server flow, with a connected app
  configured to allow for this flow.
- JupiterOne requires a Consumer Key and Consumer Secret
- You must have permission in JupiterOne to install new integrations.

## Support

If you need help with this integration, please contact
[JupiterOne Support](https://support.jupiterone.io).

## Integration Walkthrough

### In Salesforce

1. Add a
   [Connected App](https://help.salesforce.com/articleView?id=sf.connected_app_create.htm&type=5)

- Ensure the following configurations are enabled:
  - Enable OAuth Settings (Checked)
  - Callback URL: 'https://login.salesforce.com/services/oauth2/success'
  - Policy : "Access and manage your data (api)" and "Perform requests on your
    behalf at any time (refresh_token, offline_access)"
  - Save consumer key and consumer secret

### In JupiterOne

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Salesforce** integration tile and click it.
3. Click the **Add Configuration** button and configure the following settings:

- Enter the **Account Name** by which you'd like to identify this Salesforce
  account in JupiterOne. Ingested entities will have this value stored in
  `tag.AccountName` when **Tag with Account Name** is checked.
- Enter a **Description** that will further assist your team when identifying
  the integration instance.
- Select a **Polling Interval** that you feel is sufficient for your monitoring
  needs. You may leave this as `DISABLED` and manually execute the integration.
- Enter the **Consumer Key** and **Consumer Secret** for the Salesforce
  connected App

4. Click **Create Configuration** once all values are provided.

# How to Uninstall

1. From the configuration **Gear Icon**, select **Integrations**.
2. Scroll to the **Salesforce** integration tile and click it.
3. Identify and click the **integration to delete**.
4. Click the **trash can** icon.
5. Click the **Remove** button to delete the integration.

<!-- {J1_DOCUMENTATION_MARKER_START} -->
<!--
********************************************************************************
NOTE: ALL OF THE FOLLOWING DOCUMENTATION IS GENERATED USING THE
"j1-integration document" COMMAND. DO NOT EDIT BY HAND! PLEASE SEE THE DEVELOPER
DOCUMENTATION FOR USAGE INFORMATION:

https://github.com/JupiterOne/sdk/blob/master/docs/integrations/development.md
********************************************************************************
-->

## Data Model

### Entities

The following entities are created:

| Resources     | Entity `_type`              | Entity `_class` |
| ------------- | --------------------------- | --------------- |
| GROUP         | `salesforce_group`          | `Group`         |
| PermissionSet | `salesforce_permission_set` | `AccessPolicy`  |
| Profile       | `salesforce_profile`        | `Account`       |
| User          | `salesforce_user`           | `User`          |
| UserRole      | `salesforce_user_role`      | `AccessRole`    |

### Relationships

The following relationships are created/mapped:

| Source Entity `_type`  | Relationship `_class` | Target Entity `_type`       |
| ---------------------- | --------------------- | --------------------------- |
| `salesforce_group`     | **HAS**               | `salesforce_group`          |
| `salesforce_group`     | **HAS**               | `salesforce_user`           |
| `salesforce_group`     | **HAS**               | `salesforce_user_role`      |
| `salesforce_profile`   | **HAS**               | `salesforce_permission_set` |
| `salesforce_user`      | **HAS**               | `salesforce_permission_set` |
| `salesforce_user`      | **HAS**               | `salesforce_profile`        |
| `salesforce_user`      | **HAS**               | `salesforce_user_role`      |
| `salesforce_user_role` | **HAS**               | `salesforce_user_role`      |

<!--
********************************************************************************
END OF GENERATED DOCUMENTATION AFTER BELOW MARKER
********************************************************************************
-->
<!-- {J1_DOCUMENTATION_MARKER_END} -->
