BUG #1 - authUser decodes token ignoring signature instead of verifying it against SECRET_KEY

BUG #2 - requireLogin middleware returns error in catch block instead of ignoring it

BUG #3 - requireAdmin middleware return error in catch block instead of ignoring it

BUG? - User.getAll() takes redundant username and password arguments

BUG #4 - Users router.patch uses redundant requireAdmin middleware func, thus preventing regular users from editing their info

BUG #5 - Users are able to change admin property

BUG #6 - router.post for login route in auth.js missing await keyword when invoking authenticate method