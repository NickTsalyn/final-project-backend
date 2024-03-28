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
 *     summary: "User signup 🟢"
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
 *           example: AlvaroCapi@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: Zxcvb123$
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
 *              example: AlvaroCapi@example.com
 */

/** SIGNIN
 * @swagger
 * /api/users/signin:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signin 🟢"
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
 *           example: AlvaroCapi@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: Zxcvb123$
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
 *              example: AlvaroCapi@example.com
 *            theme:
 *              type: string
 *              example: violet
 *            avatar:
 *              type: string
 *              example: "/avatars/alvaro_avatar.jpg"
 */

/** SIGNOUT
 * @swagger
 * /api/users/signout:
 *   post:
 *     tags: [Authentication]
 *     summary: "User signout 🟢"
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
 *     summary: "Get current user 🟢"
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
 *           example: AlvaroCapi@example.com
 *         theme:
 *           type: string
 *           example: violet
 *         id:
 *           type: string
 *           example: 1234567890
 *         avatar:
 *           type: string
 *           example: "/avatars/alvaro_avatar.jpg"
 */

/** EDIT
 * @swagger
 * /api/users/edit:
 *   put:
 *     tags: [Authentication]
 *     summary: "Edit user profile 🟢"
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: false
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
 *           example: AlvaroCapi@example.com
 *         password:
 *           type: string
 *           minLength: 6
 *           example: Zxcvb123$
 *         avatar:
 *           type: string
 *           format: binary
 *       required: []
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
 *               example: Alvaro Capibara
 *             email:
 *               type: string
 *               example: AlvaroCapi@example.com
 *             avatar:
 *               type: string
 *               example: "/profileAvatar/alvaro_avatar.jpg"
 */

/** CHANGETHEME
 * @swagger
 * /api/users/changeTheme:
 *   patch:
 *     tags: [Authentication]
 *     summary: "Change user theme 🟢"
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/changeThemeScheme'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/changeThemeResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 */
/** SCHEMAS for CHANGETHEME:
 * @swagger
 * components:
 *   schemas:
 * 
 *     changeThemeScheme:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           example: "dark"
 * 
 *     changeThemeResponse:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           example: dark
 */

/** NEEDHELP
 * @swagger
 * /api/users/needHelp:
 *   post:
 *     tags: [Authentication]
 *     summary: "Send help request 🟢"
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

/**FORGOTPASSWORD
 * @swagger
 * /api/users/recovery-mail:
 *   post:
 *     tags: [Authentication]
 *     summary: "Send password recovery email 🟢"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: AlvaroCapi@example.com
 *     responses:
 *       200:
 *         description: Password reset code sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset code sent successfully
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
 */

/**RESETPASSWORD
 * @swagger
 * /api/users/reset-password:
 *   patch:
 *     tags: [Authentication]
 *     summary: "Reset user's password using the provided reset token 🟢"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetToken:
 *                 type: string
 *                 description: The reset token sent to the user's email
 *                 example: "abcdef123456"
 *               newPassword:
 *                 type: string
 *                 minLength: 6
 *                 description: The new password to set
 *                 example: Zxcvb123$
 *     responses:
 *       200:
 *         description: Password successfully changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password successfully changed
 *       400:
 *         description: Invalid or expired reset code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid or expired reset code
 */



/** ADDBOARD
 * @swagger
 * /api/boards/:
 *   post:
 *     tags: [Board]
 *     summary: "Add a new board 🟢"
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
 *         background:
 *           type: string
 *           example: "/backgrounds/new_board.jpg"
 *         icon:
 *           type: string
 *           example: "/icon/new_icon.jpg"
 *       required:
 *         - title
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
 *         columns:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 example: "ObjectId"
 *               ref:
 *                 type: string
 *                 example: "column"
 *         backgroundURL:
 *           type: string
 *           example: "/backgrounds/new_board.jpg"
 *         iconURL:
 *           type: string
 *           example: "/icon/new_icon.jpg"
 *         owner:
 *           type: string
 *           example: "123456789"
 */

/** GETALLBOARDS
 * @swagger
 * /api/boards:
 *   get:
 *     tags: [Board]
 *     summary: "Get all boards for the current user 🟢"
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
 *           example: "My New Board"
 *         columns:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My Column"
 *               _id:
 *                 type: string
 *                 example: "0123456789"
 *         background:
 *           type: string
 *           example: "/backgrounds/board1.jpg"
 *         icon:
 *           type: string
 *           example: "/icon/new_icon.jpg"
 *         owner:
 *           type: string
 *           example: "1234567890"
 */

/** GETBOARD
 * @swagger
 * /api/boards/{id}:
 *   get:
 *     tags: [Board]
 *     summary: "Get board by ID 🟢"
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
 *               $ref: '#/components/schemas/boardByIdResponse'
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
 *     boardByIdResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "My 1st Board"
 *         columns:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "0123456789"
 *               title:
 *                 type: string
 *                 example: "My 1st Column"
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "0123456789"
 *                     title:
 *                       type: string
 *                       example: "My 1st Task"
 *                     description:
 *                       type: string
 *                       example: "My 1st Task's description"
 *                     priority:
 *                       type: string
 *                       example: "Without"
 *                     deadline:
 *                       type: string
 *                       example: "24/04/2024"
 *                     columnID:
 *                       type: string
 *                       example: "0123456789"
 *                     owner:
 *                       type: string
 *                       example: "0123456789"
 *               boardID:
 *                 type: string
 *                 example: "0123456789"
 *               owner:
 *                 type: string
 *                 example: "0123456789"
 *         background:
 *           type: string
 *           example: "/backgrounds/example_board.jpg"
 *         icon:
 *           type: string
 *           example: "/icon/example_icon.jpg"
 *         owner:
 *           type: string
 *           example: "1234567890"
 */

/** EDITBOARD
 * @swagger
 * /api/boards/{id}:
 *   put:
 *     tags: [Board]
 *     summary: "Edit board by ID 🟢"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the board to edit
 *     requestBody:
 *       required: false
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
 *               $ref: '#/components/schemas/boardEditResponse'
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
 *         background:
 *           type: string
 *           example: "/backgrounds/updated_background.jpg"
 *         icon:
 *           type: string
 *           example: "/icon/updated_icon.jpg"
 *       required: []
 * 
 *     boardEditResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "1234567890"
 *         title:
 *           type: string
 *           example: "My 1st Board"
 *         columns:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "0123456789"
 *               title:
 *                 type: string
 *                 example: "My 1st Column"
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "0123456789"
 *                     title:
 *                       type: string
 *                       example: "My 1st Task"
 *                     description:
 *                       type: string
 *                       example: "My 1st Task's description"
 *                     priority:
 *                       type: string
 *                       example: "Without"
 *                     deadline:
 *                       type: string
 *                       example: "24/04/2024"
 *                     columnID:
 *                       type: string
 *                       example: "0123456789"
 *                     owner:
 *                       type: string
 *                       example: "0123456789"
 *               boardID:
 *                 type: string
 *                 example: "0123456789"
 *               owner:
 *                 type: string
 *                 example: "0123456789"
 *         background:
 *           type: string
 *           example: "/backgrounds/example_board.jpg"
 *         icon:
 *           type: string
 *           example: "/icon/example_icon.jpg"
 *         owner:
 *           type: string
 *           example: "1234567890"
 */

/** DELETEBOARD
 * @swagger
 * /api/boards/{id}:
 *   delete:
 *     tags: [Board]
 *     summary: "Remove board by ID 🟢"
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
 *                   example: "Board deleted successfully"
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



/** ADDCOLUMN
 * @swagger
 * /api/columns/{id}:
 *   post:
 *     tags: [Column]
 *     summary: "Add column to a board 🟢"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Board ID to add a column
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
 *           example: "New Column"
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
 *           example: "My New Column"
 *         tasks:
 *           type: array
 *           items:
 *             type: object
 *         boardID:
 *           type: string
 *           example: "1234567890"
 *         owner:
 *           type: string
 *           example: "12345678910"
 */

/** GETALLCOLUMNS
 * @swagger
 * /api/columns:
 *   get:
 *     tags: [Column]
 *     summary: "Get all columns for the current user 🟢"
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
 *           tasks:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "0123456789"
 *                 title:
 *                   type: string
 *                   example: "My 1st Task"
 *                 description:
 *                   type: string
 *                   example: "My 1st Task's description"
 *                 priority:
 *                   type: string
 *                   example: "Without"
 *                 deadline:
 *                   type: string
 *                   example: "24/04/2024"
 *           boardID:
 *             type: string
 *             example: "123456789"
 *           owner:
 *             type: string
 *             example: "1234567890"
 */

/** GETCOLUMN
 * @swagger
 * /api/columns/{id}:
 *   get:
 *     tags: [Column]
 *     summary: "Get column by ID 🟢"
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
 *         tasks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 example: "0123456789"
 *               title:
 *                 type: string
 *                 example: "My 1st Task"
 *               description:
 *                 type: string
 *                 example: "My 1st Task's description"
 *               priority:
 *                 type: string
 *                 example: "Without"
 *               deadline:
 *                 type: string
 *                 example: "24/04/2024"
 *         boardID:
 *           type: string
 *           example: "123456789"
 *         owner:
 *           type: string
 *           example: "1234567890"
 */

/** EDITCOLUMN
 * @swagger
 * /api/columns/{id}:
 *   put:
 *     tags: [Column]
 *     summary: "Edit column by ID 🟢"
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
 */

/** DELETECOLUMN
 * @swagger
 * /api/columns/{id}:
 *   delete:
 *     tags: [Column]
 *     summary: "Delete column by ID 🟢"
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
 *                 _id:
 *                   type: string
 *                   example: "122333444455555"
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



/** ADDTASK
 * @swagger
 * /api/tasks/{id}:
 *   post:
 *     tags: [Task]
 *     summary: "Add task to a column 🟢"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Column ID to add a task
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
 *           example: "My New Task"
 *         priority:
 *           type: string
 *           enum: ["Without", "Low", "Medium", "High"]
 *           default: "Without"
 *         description:
 *           type: string
 *           example: "It is description for this Task"
 *         deadline:
 *           type: string
 *           example: "24/04/2024"
 *       required:
 *         - title
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
 *           example: "My New Task"
 *         priority:
 *           type: string
 *           example: "Low"
 *         description:
 *           type: string
 *           example: "It is description for this Task"
 *         deadline:
 *           type: string
 *           example: "24/02/24"
 *         columnID:
 *           type: string
 *           example: "0987654321"
 *         owner:
 *           type: string
 *           example: "1234567890"
 * 
 */

/** GETALLTASKS
 * @swagger
 * /api/tasks:
 *   get:
 *     tags: [Task]
 *     summary: "Get all tasks for the current user 🟢"
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
 *             example: "My Task 1"
 *           description:
 *             type: string
 *             example: "It is description for this Task"
 *           priority:
 *             type: string
 *             example: "Low"
 *           deadline:
 *             type: string
 *             example: "24/02/24"
 *           columnID:
 *             type: string
 *             example: "1234567890"
 *           owner:
 *             type: string
 *             example: "123456789032"
 * 
 */

/** EDITTASK
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     tags: [Task]
 *     summary: "Edit task by ID 🟢"
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
 *       409:
 *         description: Current ID
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
 *         description:
 *           type: string
 *           example: "It is the updated description for this Task"
 *         deadline:
 *           type: string
 *           example: "31/04/25"
 * 
 */

/**CHANGECOLUMN
 * @swagger
 * /api/tasks/{id}:
 *   patch:
 *     tags: [Task]
 *     summary: "Change column of a task 🟢"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to change
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/taskChangeColumnSchema'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/taskChangeColumnResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Task not found
 *         content: {}
 */
/**SCHEMAS for CHANGECOLUMN
 * @swagger
 * components:
 *   schemas:
 *     taskChangeColumnSchema:
 *       type: object
 *       properties:
 *         columnID:
 *           type: string
 *           description: ID of the new column
 *           example: "1234567890"
 *       required:
 *         - columnID
 * 
 *     taskChangeColumnResponse:
 *       type: object
 *       properties:
 *         prevColumnID:
 *           type: string
 *           description: ID of the previous column
 *           example: "0987654321"
 *         newColumnID:
 *           type: string
 *           description: ID of the new column
 *           example: "1234567890"
 *         task:
 *           $ref: '#/components/schemas/taskResponse'
 */

/**DnDMOVEMENT
 * @swagger
 * /api/tasks/dnd/{id}:
 *   patch:
 *     tags: [Task]
 *     summary: "Move task using DnD 🟢"
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to move
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/dndMovementSchema'
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/dndMovementResponse'
 *       400:
 *         description: Bad request (invalid request body)
 *         content: {}
 *       401:
 *         description: Unauthorized (invalid access token)
 *         content: {}
 *       404:
 *         description: Task not found
 *         content: {}
 */
/**SCHEMAS for DnDMOVEMENT
 * @swagger
 * components:
 *   schemas:
 *     dndMovementSchema:
 *       type: object
 *       properties:
 *         finishTaskIndex:
 *           type: integer
 *           description: Index where task should be placed in the new column
 *           example: 0
 *         startColumnID:
 *           type: string
 *           description: ID of the column from which the task is moved
 *           example: "69693232161677777"
 *         finishColumnID:
 *           type: string
 *           description: ID of the column to which the task is moved
 *           example: "886988693311442525"
 *       required:
 *         - finishTaskIndex
 *         - startColumnID
 *         - finishColumnID
 * 
 *     dndMovementResponse:
 *       type: object
 *       properties:
 *         task:
 *           $ref: '#/components/schemas/taskResponse'
 *         finishTaskIndex:
 *           type: integer
 *           example: 3
 *         startColumnID:
 *           type: string
 *           example: "69693232161677777"
 *         finishColumnID:
 *           type: string
 *           example: "886988693311442525"
 */

/** DELETETASK
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     tags: [Task]
 *     summary: "Delete task by ID 🟢"
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
 *                 id:
 *                   type: string
 *                   example: "012233344444555555"
 *                 columnID:
 *                   type: string
 *                   example: "333444445555556969"
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
