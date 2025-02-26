import { render } from "@testing-library/react-native";
import Loading from "./Loading";
import { ActivityIndicator } from "react-native";

jest.mock("../components/Loading", () => "Loading");

describe("Loading Component", () => {
  it("renders the ActivityIndicator", () => {
    render(<Loading />);

    expect(ActivityIndicator).toBeTruthy();
  });
});
