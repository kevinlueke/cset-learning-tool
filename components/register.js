export default function RegisterForm() {

  return(
    <form>
      <label htmlFor="first_name">First Name</label>
      <input id="first_name" type="text" autoComplete="name" required />
      <label htmlFor="last_name">Last Name</label>
      <input id="last_name" type="text" autoComplete="name" required />
      <label htmlFor="email">Email</label>
      <input id="email" type="text" autoComplete="email" required />
      <button type="submit">Register</button>
    </form>
  )
}
