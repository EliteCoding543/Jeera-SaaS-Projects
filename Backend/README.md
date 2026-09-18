Jeera — Team Management SaaS

Jeera is a MERN-based Team Management SaaS application focused on Task Management and Team Chat.

The application supports:

Organization Management
Admin / Team / Employee hierarchy
Task Management
Team Chat
Role-Based Access Control (RBAC)
Multi-tenant organization isolation
Analytics in later stages
Project Hierarchy
OWNER (SUPER ADMIN)
│
├── ORGANIZATION A
│   ├── ADMIN
│   │   ├── TEAM
│   │   │   ├── EMPLOYEE
│   │   │   └── EMPLOYEE
│   │   └── TEAM
│   │       └── EMPLOYEE
│   │
│   └── ADMIN
│       └── TEAM
│           └── EMPLOYEE
│
├── ORGANIZATION B
│   └── ...
│
└── ORGANIZATION C
    └── ...
Owner is global and is not tied to an organization.
Admin belongs to one organization.
Team belongs to one organization and is managed by an Admin.
Employee belongs to one organization and one team.
Tasks belong to an organization/team and are assigned to employees.
Chat is team-based.
Roles
Owner / Super Admin

The Owner is the global platform-level role.

Can:

Create organizations
View organizations
Update/deactivate organizations
Create admins
Manage admins
View organization-wide information
Have global visibility

The Owner generally does not manage individual day-to-day tasks.

Admin

The Admin manages an organization.

Can:

Manage teams
Create/remove employees
Assign employees to teams
Create and manage tasks
Assign tasks to employees
View team tasks
Use team chat
View team analytics

An Admin must never access another organization's data.

Employee

The Employee is a team-level user.

Can:

View assigned tasks
Update permitted task fields, especially status
Participate in team chat
View their team
View relevant team information

Employees cannot change organization/team ownership fields or arbitrarily reassign tasks.

MongoDB Models

Initial models:

User
Organization
Team
Task
Message

Potential future models:

RefreshToken
Notification
Invitation

These should only be added when required.

User Model
_id
name
email
password
role
organizationId
teamId
isActive
createdAt
updatedAt

Relationships:

Owner
organizationId = null
teamId = null

Admin
organizationId = Organization._id

Employee
organizationId = Organization._id
teamId = Team._id
Organization Model
_id
name
createdBy
isActive
createdAt
updatedAt

createdBy stores the Owner's User ID.

Do not maintain arrays such as admins, teams, or employees unless there is a concrete reason. Relationships can be queried using IDs.

Team Model
_id
name
organizationId
adminId
createdAt
updatedAt

An Admin can manage multiple teams.

Example:

Organization
├── Admin A
│   ├── Backend Team
│   └── Frontend Team
│
└── Admin B
    └── HR Team
Task Model
_id
title
description
status
priority
organizationId
teamId
assignedTo
createdBy
dueDate
createdAt
updatedAt

Task status:

TODO
 ↓
IN-PROGRESS
 ↓
COMPLETED

Priority:

LOW
MEDIUM
HIGH

Initially, one task has one primary assignee.

The organizationId should also be stored directly on the Task so organization-based filtering and indexing are straightforward.

Message Model

Team chat messages contain:

_id
senderId
teamId
organizationId
content
createdAt

Future additions can include:

attachments
messageType
editedAt
deletedAt
Authentication

Initial authentication APIs:

POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me

Recommended authentication stack:

JWT
bcrypt
HTTP-only cookies

An authenticate middleware will identify the current authenticated user.

Owner creation can initially be handled through a seed/manual process.

Admins are created by Owners.

Employees are created by Admins.

Authorization / RBAC

Core middleware:

authenticate
authorize
validateOrganization
validateTeamAccess

Important security principle:

Never trust organizationId, teamId or role
sent by the frontend when those values
should be determined by the backend.

For example, when an Admin creates an employee:

POST /api/admin/teams/:teamId/employees

The backend determines:

role = "employee"

organizationId = req.user.organizationId

teamId = req.params.teamId

The backend must also verify that the team belongs to the Admin's organization and is managed by that Admin.

Owner APIs
Organization Management
POST   /api/owner/organizations
GET    /api/owner/organizations
GET    /api/owner/organizations/:organizationId
PATCH  /api/owner/organizations/:organizationId
DELETE /api/owner/organizations/:organizationId
Admin Management
POST   /api/owner/organizations/:organizationId/admins
GET    /api/owner/organizations/:organizationId/admins
GET    /api/owner/admins/:adminId
PATCH  /api/owner/admins/:adminId
DELETE /api/owner/admins/:adminId

When creating an Admin, the frontend sends:

{
  "name": "Rahul",
  "email": "rahul@acme.com",
  "password": "password"
}

The backend automatically determines:

{
  role: "admin",
  organizationId: req.params.organizationId
}
Admin APIs
Teams
POST   /api/admin/teams
GET    /api/admin/teams
GET    /api/admin/teams/:teamId
PATCH  /api/admin/teams/:teamId
DELETE /api/admin/teams/:teamId

The Admin's organization comes from:

req.user.organizationId
Employees
POST   /api/admin/teams/:teamId/employees
GET    /api/admin/teams/:teamId/employees
PATCH  /api/admin/employees/:employeeId
DELETE /api/admin/employees/:employeeId

The backend must verify that the selected team belongs to the authenticated Admin's organization and is managed by that Admin.

Task APIs
Admin
POST   /api/admin/tasks
GET    /api/admin/tasks
GET    /api/admin/tasks/:taskId
PATCH  /api/admin/tasks/:taskId
DELETE /api/admin/tasks/:taskId

Admin can:

Create tasks
Assign tasks
Reassign tasks
Edit tasks
Change priority
Change due date
Delete tasks
Filter/search tasks

Before creating a task:

Admin
 ↓
Owns/manages Team
 ↓
Employee belongs to Team
 ↓
Create Task
Employee
GET   /api/employee/tasks
GET   /api/employee/tasks/:taskId
PATCH /api/employee/tasks/:taskId/status

Employees should generally only see tasks assigned to them and only update permitted fields.

For example:

{
  "status": "completed"
}

Employees should not modify:

organizationId
teamId
createdBy
assignedTo

unless a future explicit permission allows it.

Team Chat

REST API for message history:

GET /api/teams/:teamId/messages

Socket.IO will handle real-time communication.

Initial Socket.IO events:

join-team
send-message
receive-message
user-online
user-offline
typing
stop-typing

Flow:

Employee connects
      ↓
Joins Socket.IO room
      ↓
team:<teamId>
      ↓
Sends message
      ↓
Save Message to MongoDB
      ↓
Emit message to team room

Task updates can also use real-time events:

task:created
task:updated
task:completed
Multi-Tenant Security

Every organization-scoped query must be restricted to the authenticated user's organization.

Bad:

Team.find()

Better:

Team.find({
  organizationId: req.user.organizationId
})

For Admin-specific team access:

Team.findOne({
  _id: req.params.teamId,
  organizationId: req.user.organizationId,
  adminId: req.user._id
})

This prevents an Admin from accessing another organization's data.

Backend Folder Structure
src/
│
├── controllers/
│   ├── auth.controller.js
│   ├── owner.controller.js
│   ├── organization.controller.js
│   ├── admin.controller.js
│   ├── team.controller.js
│   ├── employee.controller.js
│   ├── task.controller.js
│   └── message.controller.js
│
├── models/
│   ├── User.js
│   ├── Organization.js
│   ├── Team.js
│   ├── Task.js
│   └── Message.js
│
├── routes/
│   ├── auth.routes.js
│   ├── owner.routes.js
│   ├── admin.routes.js
│   ├── employee.routes.js
│   ├── task.routes.js
│   └── message.routes.js
│
├── middleware/
│   ├── auth.js
│   ├── role.js
│   ├── organization.js
│   └── error.js
│
├── sockets/
│   └── chat.socket.js
│
├── utils/
│   ├── ApiError.js
│   └── asyncHandler.js
│
└── app.js
Development Order
Phase 1 — Backend Foundation
Express setup
MongoDB connection
Environment variables
Error handling
Async handler
Basic folder structure
Phase 2 — Authentication
User schema
Password hashing
Login
JWT
HTTP-only cookie
authenticate middleware
Phase 3 — Owner
Owner seed
Create organization
List organizations
Organization details
Create admin
Admin management
Phase 4 — Admin
Admin login
Create team
List teams
Create employee
Team membership
Phase 5 — Tasks
Create task
Assign task
List tasks
Update task
Task status
Task authorization
Phase 6 — Chat
Message schema
Message history
Socket.IO
Team rooms
Real-time messaging
Typing/online status
Phase 7 — Production Features
Pagination
Validation
Indexes
Rate limiting
Cloudinary/file uploads
Analytics/Aggregation
Excel export
Logging
Deployment
First Milestone
OWNER LOGIN
     ↓
CREATE ORGANIZATION
     ↓
VIEW ORGANIZATION
     ↓
CREATE ADMIN
     ↓
ADMIN LOGIN

Then:

ADMIN
  ↓
CREATE TEAM
  ↓
CREATE EMPLOYEE
  ↓
EMPLOYEE LOGIN

Then:

ADMIN
  ↓
CREATE TASK
  ↓
ASSIGN EMPLOYEE
  ↓
EMPLOYEE UPDATES STATUS

Finally:

TEAM
 ├── TASKS
 └── REAL-TIME CHAT
Core Architecture
                     SUPER ADMIN
                          │
              ┌───────────┼───────────┐
              ↓           ↓           ↓
            ORG A       ORG B       ORG C
              │
            ADMINS
              │
            TEAMS
              │
          EMPLOYEES
           /       \
        TASKS      CHAT