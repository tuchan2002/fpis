'use client';

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '.';

function ReduxProvider({ children }) {
    return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
