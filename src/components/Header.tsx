import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

function Header() {
    return (
        <div className="flex items-center justify-between px-10 py-5">
            {/* Render different components based on sign-in status */}
            <SignedIn>
                {/* Display the user's profile or menu through UserButton */}
                <h1>Welcome to Your Space</h1>
                <UserButton />
            </SignedIn>

            <SignedOut>
                {/* Show the SignInButton when the user is not signed in */}
                <h1>Please Sign In</h1>
                <SignInButton />
            </SignedOut>
        </div>
    );
}

export default Header;
