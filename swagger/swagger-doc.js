/** TAGS
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: Authentication endpoints
 * 
 *   - name: Board
 *     description: Boards endpoints
 * 
 *   - name: Column
 *     description: Columns endpoints
 * 
 *   - name: Task
 *     description: Tasks endpoints
 */

/** SECURITY SCHEMES:
 * @swagger
 * components:
 *   schemas:
 *   securitySchemes:
 *     Bearer:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */



/** SIGNUP
 * @swagger
 * /api/users/signup:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signup"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSignupScheme'
 *     responses:
 *       201:
 *         description: Registration success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/signupResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       409:
 *         description: Provided email already exists
 *         content: {}
 */
/** SCHEMAS for SIGNUP:
 * @swagger
 * components:
 *   schemas:
 *     userSignupScheme:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Alvaro Capibara
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           minLength: 6
 *           example: qwerty123
 *       required:
 *         - email
 *         - password
 * 
 *     signupResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "your_generated_token"
 *         user:
 *           type: object
 *           properties:
 *            name:
 *              type: string
 *              example: Alvaro Capibara
 *            email:
 *              type: string
 *              format: email
 */

/** SIGNIN
 * @swagger
 * /api/users/signin:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signin"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSigninScheme'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/signinResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Email doesn't exist / Password is wrong
 *         content: {}
 */
/** SCHEMAS for SIGNIN:
 * @swagger
 * components:
 *   schemas:
 *     userSigninScheme:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           example: qwerty123
 *       required:
 *         - email
 *         - password
 * 
 *     signinResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "your_generated_token"
 *         user:
 *           type: object
 *           properties:
 *            name:
 *              type: string
 *              example: Alvaro Capibara
 *            email:
 *              type: string
 *              format: email
 *            theme:
 *              type: string
 *              example: violet
 *            avatar:
 *              type: string
 *              example: "/avatars/example_avatar.jpg"
 */

/** SIGNOUT
 * @swagger
 * /api/users/signout:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signout"
 *     security:
 *       - Bearer: []
 *     responses:
 *       204:
 *         description: Successful operation
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               email:
 *                 message: string
 *             example:
 *                 message: Logout succesfull
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Invalid user / Invalid session
 *         content: {}
 */

/** CURRENT
 * @swagger
 * /api/users/current:
 *   get:
 *     tags: [Authentication]
 *     summary: "Get current user"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Current user success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/currentResponse'
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */
/** SCHEMAS for CURRENT:
 * @swagger
 * components:
 *   schemas:
 *     currentResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Alvaro Capibara
 *         email:
 *           type: string
 *           format: email
 *         theme:
 *           type: string
 *           example: violet
 *         id:
 *           type: string
 *           example: 1234567890
 *         avatar:
 *           type: string
 *           example: "/avatars/example_avatar.jpg"
 */

/** EDIT
 * @swagger
 * /api/users/edit:
 *   patch:
 *     tags: [Authentication]
 *     summary: "Edit user profile"
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/userEditScheme'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/editResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: User not found
 *         content: {}
 */
/** SCHEMAS for EDIT:
 * @swagger
 * components:
 *   schemas:
 * 
 *     userEditScheme:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Alvaro Capibara
 *         email:
 *           type: string
 *           format: email
 *           example: "AlvaroCapibara@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *         avatar:
 *           type: string
 *           format: binary
 * 
 * 
 *     editResponse:
 *       type: object
 *       properties:
 *         user:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "John Cena"
 *             email:
 *               type: string
 *               example: "AlvaroCapibara@example.com"
 *             avatar:
 *               type: string
 *               example: "/profileAvatar/example_avatar.jpg"
 */

/** NEEDHELP
 * @swagger
 * /api/users/needHelp:
 *   post:
 *     tags: [Authentication]
 *     summary: "Send help request"
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userHelpMailScheme'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Mail sent"
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */
/** SCHEMAS for NEEDHELP:
 * @swagger
 * components:
 *   schemas:
 *     userHelpMailScheme:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         comment:
 *           type: string
 *           example: I need HELP !
 *       required:
 *         - email
 *         - comment
 */



/** GETALLBOARDS
 * @swagger
 * /api/boards:
 *   get:
 *     tags: [Board]
 *     summary: "Get all boards for the current user"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/allBoardsResponse'
 *       404:
 *         description: No boards added for the current user
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */
/** SCHEMAS for GETALLBOARDS:
 * @swagger
 * components:
 *   schemas:
 *     allBoardsResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "Board 1"
 *         backgroundURL:
 *           type: string
 *           example: "/backgrounds/board1.jpg"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             name:
 *               type: string
 *               example: "Alvaro Capibara"
 */

/** ADDBOARD
 * @swagger
 * /api/boards/:
 *   post:
 *     tags: [Board]
 *     summary: "Add a new board"
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/addBoardScheme'
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/addBoardResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */
/** SCHEMAS for ADDBOARD:
 * @swagger
 * components:
 *   schemas:
 *     addBoardScheme:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "New Board"
 *         backgroundURL:
 *           type: string
 *           example: "/backgrounds/new_board.jpg"
 *       required:
 *         - title
 *         - backgroundURL
 * 
 * 
 *     addBoardResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "123456789"
 *         title:
 *           type: string
 *           example: "New Board"
 *         backgroundURL:
 *           type: string
 *           example: "/backgrounds/new_board.jpg"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "123456789"
 *             name:
 *               type: string
 *               example: Alvaro Capibara
 */

/** GETBOARD
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     tags: [Board]
 *     summary: "Get board by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the board to get
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boardResponse'
 *       400:
 *         description: Bad request (invalid ID format)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Board not found
 *         content: {}
 */
/** SCHEMAS for GETBOARD:
 * @swagger
 * components:
 *   schemas:
 * 
 *     boardResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "Board 1"
 *         backgroundURL:
 *           type: string
 *           example: "/backgrounds/board1.jpg"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             name:
 *               type: string
 *               example: Alvaro Capibara
 */

/** EDITBOARD
 * @swagger
 * /api/boards/{id}:
 *   patch:
 *     tags: [Board]
 *     summary: "Edit board by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the board to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/boardEditRequest'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/boardResponse'
 *       400:
 *         description: Bad request (invalid ID format or request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Board not found
 *         content: {}
 */
/** SCHEMAS for EDITBOARD:
 * @swagger
 * components:
 *   schemas:
 * 
 *     boardEditRequest:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Updated Board Title"
 *         backgroundURL:
 *           type: string
 *           example: "/backgrounds/updated_board.jpg"
 *       required:
 *         - title
 *         - backgroundURL
 */

/** DELETEBOARD
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     tags: [Board]
 *     summary: "Remove board by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the board to remove
 *     responses:
 *       204:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Board removed"
 *       400:
 *         description: Bad request (invalid ID format)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Board not found
 *         content: {}
 */



/** GETALLCOLUMNS
 * @swagger
 * /api/columns:
 *   get:
 *     tags: [Column]
 *     summary: "Get all columns for the current user"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/allColumnsResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: No columns added
 *         content: {}
 */
/** SCHEMAS for GETALLCOLUMNS:
 * @swagger
 * components:
 *   schemas:
 * 
 *     allColumnsResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             example: "123456789"
 *           title:
 *             type: string
 *             example: "Column 1"
 *           board:
 *             type: string
 *             example: "123456789"
 *           owner:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "123456789"
 *               name:
 *                 type: string
 *                 example: "Alvaro Capibara"
 *       required:
 *         - _id
 *         - title
 *         - owner
 */

/** GETCOLUMN
 * @swagger
 * /api/columns/{id}:
 *   get:
 *     tags: [Column]
 *     summary: "Get column by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the column to get
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/columnResponse'
 *       400:
 *         description: Bad request (invalid ID format)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Column not found
 *         content: {}
 */
/** SCHEMAS for GETCOLUMN:
 * @swagger
 * components:
 *   schemas:
 * 
 *     columnResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "Column 1"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             name:
 *               type: string
 *               example: "Alvaro Capibara"
 */

/** ADDCOLUMN
 * @swagger
 * /api/columns/{boardId}/addColumn:
 *   post:
 *     tags: [Column]
 *     summary: "Add column to a board"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         description: ID of the board to add the column to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addColumnScheme'
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/columnResponse'
 *       400:
 *         description: Bad request (invalid board ID or request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Board not found
 *         content: {}
 */
/** SCHEMAS for ADDCOLUMN:
 * @swagger
 * components:
 *   schemas:
 * 
 *     addColumnScheme:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "New Column Title"
 * 
 * 
 *     columnResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "New Column Title"
 *         board:
 *           type: string
 *           example: "1234567890"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             name:
 *               type: string
 *               example: "Jhon Cena"
 */

/** EDITCOLUMN
 * @swagger
 * /api/columns/{id}:
 *   patch:
 *     tags: [Column]
 *     summary: "Edit column by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the column to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editColumnScheme'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/columnResponse'
 *       400:
 *         description: Bad request (invalid ID format or request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Column not found
 *         content: {}
 */
/** SCHEMAS for EDITCOLUMN:
 * @swagger
 * components:
 *   schemas:
 * 
 *     editColumnScheme:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Updated Column Title"
 * 
 * 
 *     columnResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "Updated Column Title"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             name:
 *               type: string
 *               example: "Alvaro Capibara"
 */

/** DELETECOLUMN
 * @swagger
 * /api/columns/{id}:
 *   delete:
 *     tags: [Column]
 *     summary: "Delete column by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the column to delete
 *     responses:
 *       204:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Column removed"
 *       400:
 *         description: Bad request (invalid ID format)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Column not found
 *         content: {}
 */



/** GETALLTASKS
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: [Task]
 *     summary: "Get all tasks for the current user"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/allTasksResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */
/** SCHEMAS for GETALLTASKS:
 * @swagger
 * components:
 *   schemas:
 * 
 *     allTasksResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           _id:
 *             type: string
 *             example: "1234567890"
 *           title:
 *             type: string
 *             example: "Task 1"
 *           priority:
 *             type: string
 *             enum: ["Without", "Low", "Medium", "High"]
 *             default: "Without"
 *             example: "Low"
 *           deadline:
 *             type: string
 *             example: "24/02/24"
 *           column:
 *             type: string
 *             example: "1234567890"
 *           owner:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "1234567890"
 *               name:
 *                 type: string
 *                 example: "Alvaro Capibara"
 */

/** ADDTASK
 * @swagger
 * /api/tasks/{columnId}/addTask:
 *   post:
 *     tags: [Task]
 *     summary: "Add task to a column"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *         description: ID of the column to add the task to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/addTaskScheme'
 *     responses:
 *       201:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/taskResponse'
 *       400:
 *         description: Bad request (invalid column ID or request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Column not found
 *         content: {}
 */
/** SCHEMAS for ADDTASK:
 * @swagger
 * components:
 *   schemas:
 * 
 *     addTaskScheme:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "New Task Title"
 *         priority:
 *           type: string
 *           enum: ["Without", "Low", "Medium", "High"]
 *           default: "Without"
 *         deadline:
 *           type: string
 *           example: "24/02/24"
 * 
 * 
 *     taskResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "New Task Title"
 *         priority:
 *           type: string
 *           enum: ["Without", "Low", "Medium", "High"]
 *           default: "Without"
 *         deadline:
 *           type: string
 *           example: "24/02/24"
 *         column:
 *           type: string
 *           example: "0987654321"
 *         owner:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "1234567890"
 *             name:
 *               type: string
 *               example: "Jhon Cena"
 */

/** EDITTASK
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     tags: [Task]
 *     summary: "Edit task by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/editTaskScheme'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/taskResponse'
 *       400:
 *         description: Bad request (invalid ID format or request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Task not found
 *         content: {}
 */
/** SCHEMAS for EDITTASK:
 * @swagger
 * components:
 *   schemas:
 * 
 *     editTaskScheme:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Updated Task Title"
 *         priority:
 *           type: string
 *           enum: ["Without", "Low", "Medium", "High"]
 *         deadline:
 *           type: string
 *           example: "25/02/24"
 */

/** DELETETASK
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags: [Task]
 *     summary: "Delete task by ID"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted"
 *       400:
 *         description: Bad request (invalid ID format)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Task not found
 *         content: {}
 */

