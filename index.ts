// STEP 1
// setting variables
const url:string = "https://dummyjson.com";
const endPoint: string = "/users"
// u could use /posts or /products for other data types

//fetch('https://dummyjson.com/users?limit=5&skip=10&select=gender,hair,address')
//.then(res => res.json())
//.then(console.log);

//fetch('https://dummyjson.com/users/filter?&limit=5&skip=10&key=hair.color&value=Brown&gender=&select=gender,age,hair,address')
//.then(res => res.json())
//.then(console.log);

//fetch('https://dummyjson.com/users&limit=5&skip=10&filter?key=hair.color&value=Brow')
//.then(res => res.json())
//.then(console.log);

// STEP 2
async function GetAllItems(
  url: string, endpoint: string
): Promise<unknown> {
  const response = await fetch(url + endpoint);
  const json = await response.json();
  return json.users 
}


// STEP 3
const userExample = {
  gender: '',
  hair: '',
  address: '',
  age: '',
}
type User = typeof userExample



// STEP 4
// the checker will take a user as an param to check on its type
// and will return the result narrowed using the Type-gaurd operator `is`
// so if user passes the checker and evaluates to => true
// that will enforce our typing for intellisense and type-safe use for all users
function isUser(user: any): user is User {
  // defaulting to false for effective checking
  let checking = false
  // iterating over keys from the `userExample` as they r the same keys for `User`
  for(const t of Object.keys(userExample)){
   checking = t in user
    if(!checking)
      return false
  }
  // if only one key evaluetes false 👆 user fails the test
  // otherwise it passes and return true 👇 and pass the success status to all the array result of users
  return checking
}

// STEP 5
SendReq()
async function SendReq(
): Promise<User | null> {
// now we call our API endpoint and return:
// User type on seccess
// null type on fail
  const allUsers:any = await GetAllItems(url, endPoint) // allUsers as `any` here to bypass the linter and we r about to check the type ourselves
  const user = allUsers[0] 
  if (user && isUser(user)) {
    console.log(user)
    // now user is typed and can be used safely 
    return allUsers; 
  }
  return null; // in case isUser(user) checking fails
}