import { AUTH, ALERT } from "../types";
import { getDataAPI, postDataAPI } from "../../utils/fetchData";

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postDataAPI("auth/login", data);
    dispatch({
      type: AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("accessToken", res.data.access_token);
    dispatch({
      type: ALERT,
      payload: {
        success: res.message,
      },
    });
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};

export const getAuth = () => async (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    dispatch({ type: ALERT, payload: { loading: true } });

    try {
      const res = await getDataAPI("auth/get-auth", accessToken);
      dispatch({
        type: AUTH,
        payload: {
          token: accessToken,
          user: res.data.user,
        },
      });

      dispatch({ type: ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  } catch (err) {
    dispatch({
      type: ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
