(function(){
    const btns = document.querySelectorAll('[data-role-test]');
    const body = document.body;
    const roleName = document.getElementById('role-name');
    const roleCurrent = document.getElementById('role-current');

    const niceName = {
        'loup':'Loup-garou',
        'voyante':'Voyante',
        'sorciere':'Sorcière',
        'medecin':'Médécin',
        'chasseur':'Chasseur',
        'cupidon':'Cupidon',
        'amoureux':'Amoureux',
        'villageois':'Villageois',
        'blanc':'Loup-blanc'
    };

    function setRole(role){
        const klass = 'role--' + role;
        body.classList.remove(
            'role--loup','role--voyante','role--sorciere','role--medecin','role--chasseur',
            'role--cupidon','role--amoureux','role--villageois','role--blanc'
        );
        body.classList.add(klass);
        const name = niceName[role] || role;
        roleName.textContent = name;
        roleCurrent.textContent = name;
    }

    // default
    setRole('loup');

    btns.forEach(b => {
        b.addEventListener('click', () => setRole(b.getAttribute('data-role-test')));
    });
})();
