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
 *           example: "John Cena"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.cena@example.com"
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
 *               example: "john.cena@example.com"
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
 *             example:
 *               message: "Mail sent"
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
 *       required:
 *         - title
 *         - backgroundURL
 *         - owner
 */

/** ADDBOARD
 * @swagger
 * /api/boards/add:
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
 *               example: "John Doe"
 */
