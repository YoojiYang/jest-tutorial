import { render, screen } from "@testing-library/react"
import Login, { validateEmail } from "../Login";
import userEvent from "@testing-library/user-event";

describe("Test Loguin Compornent", () => {
  test("render form with 1 button", async () => {
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });

  test("should be failed on email validation", () => {
    const testEmail = "shincode.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });
  
  test("should be successed on email validation", () => {
    const testEmail = "shincode@gmail.com";
    expect(validateEmail(testEmail)).toBe(true);
  });

  test("password input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });

  test("shold be able to submit the form", async () => {
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");
    
    userEvent.type(email, "shincode@gmail.com");
    userEvent.type(password, "abcdefg");

    userEvent.click(submitButton);
    const userInfo = await screen.findByText("shincode@gmail.com");
    expect(userInfo).toBeInTheDocument();
  });

});