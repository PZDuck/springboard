BUG #1 - authUser decodes token ignoring signature instead of verifying it against SECRET_KEY

BUG? - User.getAll() takes redundant username and password arguments

BUG #2 - Users router.patch uses redundant requireAdmin middleware func, thus preventing regular users from editing their info

BUG #3 - Users are able to change admin property

BUG #4 - router.post for login route in auth.js missing await keyword when invoking authenticate method