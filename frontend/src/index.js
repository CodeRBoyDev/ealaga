import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RoutedApp from './Routes';
import ChatProvider from "./components/chat/Context/ChatProvider";
import 'bootstrap/dist/css/bootstrap.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ChatProvider>  
<RoutedApp />
</ChatProvider>
);

