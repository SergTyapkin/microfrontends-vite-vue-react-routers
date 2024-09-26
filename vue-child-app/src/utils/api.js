import REST_API from "@sergtyapkin/rest-api"

export default class API extends REST_API {
    login = (email, password, clientBrowser, clientOS) => this.post('/api/user/auth/login', {email, password, clientBrowser, clientOS});
    register = (client_browser, clientOS, email, group, name, password, phone_number, telegram, vk) => this.post('/api/user/auth/register', {client_browser, clientOS, email, group, name, password, phone_number, telegram, vk});
    logout = () => this.delete('/api/user/logout');
    getAllSessions = () => this.get('/api/sessions');
    logoutAnother = () => this.delete('/api/user/sessions/another');
    getUser = () => ({
        ok: true,
        code: 200,
        data: {
            id: "10",
            group: "РК5-34Б",
            email: "koMANDA@mail.ru",
            is_admin: false,
            name: "MIcrochelik",
            phone_number: "8912319412",
            team_id: 2,
            telegram: "Tyapkin_S",
            vk: "tyapkin_s",
        }
    }); //this.get('/api/user');
    getUserById = (id) => this.get(`/api/user`, {id});
    sendConfirmationLetter = (name, email) => this.post('/api/email/confirm', {name, email});
    confirmRegistrationByCode = (secretCode) => this.put('/api/user/email/confirm', {secretCode});
    changePassword = (oldPassword, newPassword) => this.put('/api/user/password', {oldPassword, newPassword});
    editProfile = (name, group, telegram, vk, email, phone_number) => this.put('/api/user', {name, group, telegram, vk, email, phone_number});
    sendRestorePasswordLetter = (secretCode, newPassword) => this.post('/api/user/password/restore', {secretCode, newPassword});
    restorePassword = (secretCode, newPassword) => this.put('/api/user/password', {secretCode, newPassword});
    authCode = (secretCode, clientBrowser, clientOS) => this.post('/api/user/auth/code', {secretCode, clientBrowser, clientOS});
    createTeam = (team_name) => this.post('/api/team', {team_name});
    editTeam = (new_team_name) => this.put('/api/team', {new_team_name});
    getTeam = () => this.get('/api/team');
    deleteTeam = () => this.delete('/api/team');
    addMember = (user_email) => this.post(`/api/team/member`, {user_email});
    deleteMember = (id) => this.delete(`/api/team/member`, {id});
    setMemberRole = (id, roleId) => this.put(`/api/team/member`, {id, roleId});
    getTextTask = () => this.get('/api/task/text');
    getMediaTask = () => this.get('/api/task/media');
    answerTextTask = (answer, id) => this.post('/api/task/answer', {answer, id});
    answerMediaTask = (text, imageUrl) => this.post('/api/task/answer', {text, imageUrl});
    getHint = () => this.get('/api/task/hint');
    answerSecret = (answer) => this.post('/api/answer/secret_task', {answer});
    getAdminUsersAnswers = () => this.get('/api/admin/answers');
    adminSetAnswerConfirmation = (answerId, isConfirmed) => this.put('/api/admin/answer/confirmation', {answerId, isConfirmed});
    uploadImage = (base64) => this.post('/api/image/upload', {base64});
    getTaskTypes = () => this.get('/api/task/types');
}
