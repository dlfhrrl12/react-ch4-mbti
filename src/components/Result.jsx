import { mbtiDescriptions } from "../utils/mbtiCalculator";

const Result = () => {
    const mbtiResult = sessionStorage.getItem('mbtiResult');

    return (
        <div className="">
            <h1>테스트 결과 : {mbtiResult}</h1>
            <p>{mbtiDescriptions[mbtiResult]}</p>
        </div>
    );
};
export default Result;