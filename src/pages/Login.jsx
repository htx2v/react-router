import { useLoaderData, Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from "../api.js"

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}
export async function action({request}) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedin",true)
        const response = redirect("/host")
        response.body = true  
        return response
    } catch(err) {
        return err.message
    }
}

export default function Login() {
    const errorMessage = useActionData()
    console.log(errorMessage)
    const navigation = useNavigation()
    const message = useLoaderData()

    return (
        <div className="login-container">
            <h1>Sign in to your account</h1>
            { message && <h3 className="red">{message}</h3>}
            { errorMessage && <h3 className="red">{errorMessage}</h3>}
            <Form replace method="post"  className="login-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? "Logging in.." : "Log in"}
                </button>
            </Form>
        </div>
    )
}