import type { JSX } from "react";

type Tester = [RegExp, string][];
function passwordTester(password: string): [JSX.Element[], number] {
  let strengthCount: number = 0;
  // Define the password testing criteria
  const passwordTester: Tester = [
    [/.{6}/, "It must contain up to six characters"],
    [/[A-Z]/, "It must contain an uppercase character"],
    [/[a-z]/, "It must contain a lowercase character"],
    [/[0-9]/, "It must contain a digit"],
  ];
  
  // Map through the criteria and check the password against each regex
  const strength: JSX.Element[] = passwordTester.map(([regex, message], index) => {
    const result = regex.test(password);
    if (result) strengthCount++;
    return (
      <p key={index} className={`my-1 ${result ? "text-green-400" : "text-red-500"}`}>
        {message}
      </p>
    );
  });

  return [strength, strengthCount];
}
export default passwordTester;