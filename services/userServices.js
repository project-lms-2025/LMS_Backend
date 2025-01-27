const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Initialize Supabase client using credentials from .env
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Service to create a new user using Supabase
const createUser = async ({ username, email, password }) => {
  // Register the user with Supabase Auth
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);  // Throw error if registration fails
  }

  // Optionally, insert the username into a separate users table (for extra fields)
  const { data, error: dbError } = await supabase
    .from('users')
    .insert([{ user_id: user.id, username }]);

  if (dbError) {
    throw new Error(dbError.message);  // Handle errors when inserting into the 'users' table
  }

  // Return the created user object (without password)
  return { username, email };
};

module.exports = { createUser };
