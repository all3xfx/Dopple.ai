import AppleLogin from "react-apple-login";
import { cn } from "#/lib/cn";

export function AppleLoginButton() {
  const login = (res: any) => console.log(res);

  return (
    <AppleLogin
      clientId="YOUR_CLIENT_ID"
      redirectURI="https://dopple-ai-landing.vercel.app"
      usePopup={true}
      callback={res => login(res)} // Catch the response
      scope="email name"
      responseMode="query"
      render={renderProps => (
        <button
          className={cn(
            "duration-800 relative h-[45px] rounded-[5px] bg-button text-center text-[14px] font-bold leading-[17px] outline-none transition hover:bg-white hover:text-[#191A1E] md:h-[50px]",
          )}
          onClick={renderProps.onClick}
        >
          Continue with Apple
          <svg
            className={cn(
              "absolute left-5 top-1/2 h-[23.17px] w-[23.17px] -translate-y-1/2 md:left-[15px] md:h-5 md:w-5",
            )}
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M15.1643 19.1976C14.0658 20.253 12.8665 20.0864 11.712 19.5864C10.4903 19.0754 9.36946 19.0532 8.08049 19.5864C6.46647 20.2752 5.61462 20.0752 4.65069 19.1976C-0.81905 13.6094 -0.0120387 5.09936 6.19746 4.78828C7.71061 4.86605 8.76421 5.6104 9.64968 5.67706C10.9723 5.41043 12.2388 4.64386 13.6511 4.74385C15.3436 4.87716 16.6214 5.54374 17.462 6.74359C13.9649 8.82111 14.7944 13.3872 18 14.6648C17.3611 16.3313 16.5317 17.9866 15.153 19.2087L15.1643 19.1976ZM9.53759 4.72163C9.36946 2.24416 11.3982 0.199975 13.7296 0C14.0546 2.8663 11.1068 4.99937 9.53759 4.72163Z" />
          </svg>
        </button>
      )}
    />
  );
}
