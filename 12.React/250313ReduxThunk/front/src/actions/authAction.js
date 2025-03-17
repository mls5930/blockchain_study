import instance from "../api/axios";
import { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE } from "../reducers/authReducer"

// 액션 생성자들 (동기) - 이름만 보고도 어떤 액션인지 알 수 있게!
export const authStart = () => ({ type: AUTH_START });
export const authSuccess = (payload) => ({ type: AUTH_SUCCESS, payload });
export const authFailure = (error) => ({ type: AUTH_FAILURE, payload: { error_message: error.message } });

// (1) 비동기 로직을 처리할 Thunk 액션
export const authMe = () => {
    return async(dispatch) => {
        try {
            // (3) 요청 시작 시점에 로딩 상태로 만들 수도 있음
            dispatch(authStart());

            // (4) 백엔드로 인증 확인 요청 (예: /api/auth/me)
            // axios instance에 access_token값을 미리 넣어주면 좋다
            const response = await instance.get("/api/authMe");
            
            // (5) 요청 성공 시 상태 업데이트
            // userData 안에는 사용자 정보(id, email, roles 등)이 있을 것
            // 필요하다면 해당 유저 정보를 가지고 jwt를 만들면 더 좋음.
            dispatch(authSuccess(response.data));
        } catch (error) {
            // 4) 실패 시 에러 처리
            dispatch(authFailure(error.message));
        }
    }
}

        /*
            로그인

            나를 검증해야 함.
            로직이 어떻게 될 것 같음?

            먼저 액션을 짜기 전, 로직을 어떻게 작성해야 할지 고민해야함.

            1. 무슨 액션 취할거임?
            2. 어떤 값 던져줄거임?

            
            1. 사용자 인증 요청

                - 토큰이 유효한지, 세션이 남아있는지 확인

            2. 응답을 받아서

                - 성공 시 => dispatch({ type: AUTH_SUCCESS, payload: user })
                - 실패 시 => dispatch({ type: AUTH_SUCCESS, payload: error })

            3. 상태 업데이트

                - 인증 성공시: state.auth.user에 사용자 정보 저장
                - 인증 실패시: 에러 표시, 로그인 화면 이동 등
        */


    /*
    
import instance from "../api/axios";
import { AUTH_FAILURE, AUTH_FAILURE } from "../reducers/authReducer"

// (1) 비동기 로직을 처리할 Thunk 액션
export const authMe = () => {
    return async(dispatch) => {
        try {
            // (3) 요청 시작 시점에 로딩 상태로 만들 수도 있음
            dispatch({ type: "AUTH_START" });

            // (4) 백엔드로 인증 확인 요청 (예: /api/auth/me)
            // axios instance에 access_token값을 미리 넣어주면 좋다
            const userData = await instance.get("/api/authMe")
            
            // (5) 요청 성공 시 상태 업데이트
            // userData 안에는 사용자 정보(id, email, roles 등)이 있을 것
            // 필요하다면 해당 유저 정보를 가지고 jwt를 만들면 더 좋음.
            dispatch({ 
                type: AUTH_SUCCESS, 
                payload: userData 
            });
        } catch (error) {
            // (6) 요청 실패 시 에러 상태 업데이트
            dispatch({ 
                type: AUTH_FAILURE, 
                payload: { error_message: error.message }
            });
        }
    }
}
*/