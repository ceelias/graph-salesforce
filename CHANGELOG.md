# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## 1.1.0 - 2022-03-18

### Added

- New properties added to entities:

  | Entity            | Properties |
  | ----------------- | ---------- |
  | `salesforce_user` | `active` |

## 1.0.0 - 2022-03-17

### Added

- New properties added to entities:

  | Entity            | Properties |
  | ----------------- | ---------- |
  | `salesforce_user` | `userType` |

## 0.2.0 2021-10-27

### Changed

- Updated `@jupiterone/integration-sdk-*` packages

## 0.1.4 2021-07-08

### Changed

- Updated user to permission set and user to user role relationships from has to
  assigned:

  | Source                 | \_class    | Target                 |
  | ---------------------- | ---------- | ---------------------- |
  | `salesforce_group`     | `ASSIGNED` | `salesforce_user_role` |
  | `salesforce_user_role` | `CONTAINS` | `salesforce_user_role` |

## 0.1.3 2021-07-01

### Changed

- Updated user to permission set and user to user role relationships from has to
  assigned:

  | Source            | \_class    | Target                      |
  | ----------------- | ---------- | --------------------------- |
  | `salesforce_user` | `ASSIGNED` | `salesforce_permission_set` |
  | `salesforce_user` | `ASSIGNED` | `salesforce_user_role`      |

## 0.1.2 2021-06-21

### Added

- Added support for ingesting the following **new** resources:

  | Service       | Resource / Entity           |
  | ------------- | --------------------------- |
  | Group         | `salesforce_group`          |
  | PermissionSet | `salesforce_permission_set` |
  | Profile       | `salesforce_profile`        |
  | User          | `salesforce_user`           |
  | UserRole      | `salesforce_user_role`      |

* Added support for ingesting the following **new** relationships:

  | Source                 | \_class | Target                      |
  | ---------------------- | ------- | --------------------------- |
  | `salesforce_group`     | `HAS`   | `salesforce_group`          |
  | `salesforce_group`     | `HAS`   | `salesforce_user`           |
  | `salesforce_group`     | `HAS`   | `salesforce_user_role`      |
  | `salesforce_profile`   | `HAS`   | `salesforce_permission_set` |
  | `salesforce_user`      | `HAS`   | `salesforce_permission_set` |
  | `salesforce_user`      | `HAS`   | `salesforce_profile`        |
  | `salesforce_user`      | `HAS`   | `salesforce_user_role`      |
  | `salesforce_user_role` | `HAS`   | `salesforce_user_role`      |

### Added

- User Group Entity
- User Entity
- Profile Entity
- Permission Set Entity
- User Role Entity
- User Group User Relationship
- User Permission Set Relationship
- User Profile Relationship
- User Role User Relationship
- Profile Permission Set Relationship
- Group User Role Relationship
