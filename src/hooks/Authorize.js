import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import Loading from '../components/Loading';
import { getCookie, setCookie } from '../utilities/cookies';
import { env, getDomain } from '../utilities/function';
import axios from 'axios';
import Setup from '../components/Setup';
import OrganizationList from '../components/OrganizationList';
import { useSearchParams } from 'react-router-dom';
import InvitationPage from '../components/InvitationPage';
import { authServer } from '../utilities/axiosPrototypes';
// import Setup from '../components/Setup';

const authorizeContext = createContext();

const AuthorizationProvider = ({ children }) => {
    const [content, setContent] = useState(
        <Loading message='Please wait, logging you in...' />
    );
    const [user, setUser] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [organizations, setOrganizations] = useState([]);
    const [organizationId, setOrganizationId] = useState(null);
    const [members, setMembers] = useState({});

    const authorize = async (loggedIn, cb, setup, orgId, invite) => {
        console.log(organizationId);
        if (loggedIn) {
            if (invite)
                return setContent(
                    <InvitationPage
                        setContent={setContent}
                        children={children}
                        organizations={organizations}
                    />
                );
            if (orgId) setContent(children);
            else {
                if (setup) {
                    setContent(
                        <OrganizationList
                            setContent={setContent}
                            children={children}
                            organizations={organizations}
                        />
                    );
                } else {
                    setContent(
                        <Setup
                            setContent={setContent}
                            children={children}
                            organizations={organizations}
                        />
                    );
                }
            }
        } else {
            const redirectTo =
                env('AUTHENTICATION_CLIENT') +
                '/login?redirectto=' +
                encodeURIComponent(window.location.href);
            setContent(
                <Loading
                    message='Please wait, redirecting you to Clikkle Accounts'
                    redirectTo={redirectTo}
                />
            );
        }
        if (typeof cb === 'function') cb(setUser);
    };

    const fetchOgranizations = useCallback(
        async function () {
            try {
                const response = await authServer.get(`/organization`);

                const fetchOrgs = response.data.organizations;

                setOrganizations(fetchOrgs);
                return fetchOrgs;
            } catch (e) {
                console.log(e);
            }
        },
        [setOrganizations]
    );

    const checkInvitation = useCallback(async function (id) {
        try {
            const response = await authServer.get(`/organization/${id}`);

            const { isInvited } = response.data;

            return isInvited;
        } catch (e) {
            console.log(e);
        }
    }, []);

    const checkInvitationExternal = useCallback(async function (code) {
        try {
            const response = await authServer.get(
                `/invitation/exists?code=${code}`
            );

            const { isInvited } = response.data;

            return isInvited;
        } catch (e) {
            console.log(e);
        }
    }, []);

    useEffect(() => {
        fetchOgranizations();
    }, [fetchOgranizations]);

    useEffect(() => {
        organizationId && checkInvitation();
    }, [checkInvitation, organizationId]);

    useEffect(() => {
        (async () => {
            try {
                const accessToken = getCookie('accessToken');
                const projectsAccessToken = getCookie('accessToken-projects');
                const role = getCookie('role');
                const orgId = Boolean(searchParams.get('org'));
                const organizationId = searchParams.get('org');
                const invitedCodeState = Boolean(searchParams.get('code'));
                const invitedCode = searchParams.get('code');

                if (projectsAccessToken && invitedCodeState) {
                    const response = await authServer.get(`/${role}/profile`);

                    const user = response.data.user;
                    const invited = await checkInvitationExternal(invitedCode);
                    if (invited) {
                        return authorize(
                            true,
                            setUser => setUser(user),
                            true,
                            orgId,
                            true
                        );
                    } else {
                        authorize(true, setUser => setUser(user), false);
                    }
                } else {
                    if (projectsAccessToken && orgId) {
                        const response = await authServer.get(
                            `/${role}/profile`
                        );

                        const user = response.data.user;

                        const fetchOrgs = await fetchOgranizations();
                        const invited = await checkInvitation(organizationId);

                        if (invited) {
                            authorize(
                                true,
                                setUser => setUser(user),
                                true,
                                orgId,
                                true
                            );
                            setOrganizationId(searchParams.get('org'));
                        } else {
                            const result = fetchOrgs.some(
                                org => org.organizationId === organizationId
                            );

                            if (result) {
                                authorize(
                                    true,
                                    setUser => setUser(user),
                                    true,
                                    orgId
                                );
                                setOrganizationId(searchParams.get('org'));
                            } else {
                                authorize(true, setUser => setUser(user), true);
                                searchParams.delete('org');

                                setSearchParams(searchParams);
                            }
                        }

                        return;
                    }
                }

                const response = await axios.get(`/unauth/login`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const user = response.data.user;

                const projectToken = response.data.newToken;

                setCookie('accessToken-projects', projectToken, {
                    domain: getDomain(env('COOKIE_DOMAIN')),
                });

                if (!orgId) {
                    const res = await authServer.get(`/organization`);
                    const organization = res.data.organizations;

                    if (!organization.length)
                        return authorize(true, setUser => setUser(user), false);
                }

                authorize(true, setUser => setUser(user), true, orgId);
                setOrganizationId(searchParams.get('org'));
            } catch (err) {
                console.log(err);
                authorize(false);
            }
        })();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // fetch image
    const fetchMembers = useCallback(
        async function (id) {
            try {
                const response = await authServer.get(
                    `organization/${id}/member`
                );

                setMembers({});

                const members = response.data.members;

                const formatMembers = {};

                members.forEach(
                    member => (formatMembers[member.userId] = member)
                );

                setMembers(formatMembers);
            } catch (e) {
                console.log(e);
            }
        },
        [setMembers]
    );

    useEffect(() => {
        fetchMembers(organizationId);
    }, [fetchMembers, organizationId]);

    return (
        <authorizeContext.Provider
            value={{
                authorize,
                setUser,
                user,
                setContent,
                organizationId,
                setOrganizationId,
                organizations,
                fetchOgranizations,
                members,
            }}>
            {content}
        </authorizeContext.Provider>
    );
};
// member with photo

const useAuthorize = () => useContext(authorizeContext).authorize;
const useUser = () => useContext(authorizeContext).user;
const useMembers = () => useContext(authorizeContext).members;
const useSetUser = () => useContext(authorizeContext).setUser;
const useSetContent = () => useContext(authorizeContext).setContent;
const useSetOrganizationId = () =>
    useContext(authorizeContext).setOrganizationId;
// const useOrganizationId = () => useContext(authorizeContext).organizationId;
const useOrganizationId = () => null;
const useOrganizations = () => useContext(authorizeContext).organizations;
const useFetchOrganizations = () =>
    useContext(authorizeContext).fetchOgranizations;

export default AuthorizationProvider;
export {
    useAuthorize,
    useUser,
    useSetUser,
    useSetContent,
    useSetOrganizationId,
    useOrganizationId,
    useOrganizations,
    useFetchOrganizations,
    useMembers,
};

// internal user  -> domain?org=316546
// external user -> domain/invite?code=24643
