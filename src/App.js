import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './utilities/axios';

//pages
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import CreateProject from './pages/Project/CreateProject';
import ViewProject from './pages/ViewProject';
import OrganizationUser from './pages/OrganizationUser';
import Organization from './pages/Organization';
import Projects from './pages/Project/Projects';
import UserDetails from './pages/OrganizationUser/UserDetails';
import Activities from './pages/Activities';
import YourTeam from './pages/YourTeam';
import YourWork from './pages/YourWork';
// import Labels from './pages/ViewProject/Labels';

const App = () => {
    return (
        <Header>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/create-project' element={<CreateProject />} />
                <Route path='/create-project/:id' element={<CreateProject />} />
                <Route path='/projects'>
                    <Route index element={<Projects />} />
                    <Route path='files/board' element={<ViewProject />} />
                </Route>
                <Route
                    path='/organization-user'
                    element={<OrganizationUser />}
                />
                <Route path='/organizations' element={<Organization />} />
                <Route path='/user-details' element={<UserDetails />} />
                <Route path='/all-activity' element={<Activities />} />
                {/* <Route path='/labels-setting' element={<Labels />} /> */}
                <Route path='/your-work' element={<YourWork />} />
                <Route path='/team' element={<YourTeam />} />
            </Routes>
        </Header>
    );
};

export default App;
