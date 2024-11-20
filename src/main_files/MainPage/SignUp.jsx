function SignUpForm(){
    return(
        <form action="/" method="post" className="form-signup">
            <label id="email">SIGN UP FOR OUR DAILY INSIDER</label>
            <input type="email" class="email" name="email" placeholder="Enter your email" required></input>
            <button type="submit">Subscribe</button>
        </form>
    )
}

export default SignUpForm