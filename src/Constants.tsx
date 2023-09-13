export const NotificationKeys = {
    ErrorNoPermission: {
        color: 'red',
        id: 'error_no_permission'
    },
    ErrorFichaNotFound: {
        color: 'red',
        id: 'error_ficha_not_found'
    },
    ErrorMesaNotFound: {
        color: 'red',
        id: 'error_mesa_not_found'
    },
    ErrorMinhasMesas: {
        color: 'red',
        id: "error_minhas_mesas_unexpected"
    },
    ErrorMinhasFichas: {
        color: "red",
        id: 'error_minhas_fichas_unexpected'
    },
    ErrorLookup: {
        color: 'red',
        id: 'error_lookup_unexpected'
    },
    SuccessCoCAmmoSave: {
        color: 'green',
        id: 'success_coc_ammo_saved'
    },
    SuccessCoCOccupationSave: {
        color: 'green',
        id: 'success_coc_occupation_saved'
    },
    SuccessCoCPulpTalentSave: {
        color: 'green',
        id: 'success_coc_pulp_talent_saved'
    },
    SuccessCoCSkillSave: {
        color: 'green',
        id: 'success_coc_skill_saved'
    },
    SuccessCoCWeaponSave: {
        color: 'green',
        id: 'success_coc_weapon_saved'
    },
    SuccessGenericSave: {
        color: 'green',
        id: 'success_data_saved'
    },
    ErrorGenericSave: {
        color: 'red',
        id: 'error_data_save_unexpected'
    },
    ErrorDataFetch: {
        color: 'red',
        id: 'error_data_fetch_unexpected'
    },
    ErrorDataDelete: {
        color: 'red',
        id: 'error_delete_item'
    },
    SuccessDataDelete: {
        color: 'green',
        id: 'success_delete_item'
    }
  } as const

export type NotificationKeysType = typeof NotificationKeys[keyof typeof NotificationKeys];