export default function LoginForm(){
    return(
      <form>
        <label htmfor="email">Email</label>
        <input id="email" type="text" autoComplete="email" required />
        <button type="submit">Login</button>
      </form>
    )
  }
