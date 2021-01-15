# Kanban Application

## Routes:
 - Auth
   * Login ```/login```
   * Register ```/register```
 - Organization
   * Get ```/organizations```
   
      > Menampilkan data org milik user

   * Post ```/organizations```
   * Get ```/organizations/:orgId```

      > Mengambil data org untuk ditampilkan

   * Put ```/organizations/:orgId```

      > Update name

   * Patch ```/organizations/:orgId```

      > Ganti admin

   * Delete ```/organizations/:orgId```
 - User
   * Get ```/organizations/:orgId/users```

      > Data user yg blom ada di org

 - Member
   * Get ```/organizations/:orgId/members```

      > Menampilkan data team

   * Post ```/organizations/:orgId/members```
   * Delete ```/organizations/:orgId/members/:userId```
 - Category
   * Get ```/categories/:orgId```
   * Post ```/categories/:orgId```
   * Put ```/categories/:orgId/:catId```
   * Delete ```/categories/:orgId/:catId```
 - Task
   * Get ```/tasks/:orgId```
   * Post ```/tasks/:orgId```
   * Put ```/tasks/:orgId/:taskId```
   * Patch ```/tasks/:orgId/:taskId```
   * Delete ```/tasks/:orgId/:taskId```