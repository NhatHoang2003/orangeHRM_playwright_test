import { expectedResult } from "./loginExpected.enum";

export interface loginData {
    username: string,
    password: string,
    expected_result: expectedResult
}