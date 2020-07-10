import request from '@/utils/request'

const taskApi = {
    CreateTask: '/task/create',
    GetTasks: '/task/fetchall',
    GetDevices: '/device/fetchall'
}

/**
 * createtask func
 * @param parameter
 * @returns {*}
 */
export function carete_task(parameter) {
    return request({
        url: taskApi.CreateTask,
        method: 'post',
        data: parameter
    })
}


/**
 * get_tasks func
 * @param parameter
 * @returns {*}
 */
export function get_tasks(parameter) {
    return request({
        url: taskApi.GetTasks,
        method: 'get',
        data: parameter
    })
}

/**
 * get_devices func
 * @param parameter
 * @returns {*}
 */
export function get_devices(parameter) {
    return request({
        url: taskApi.GetDevices,
        method: 'get',
        data: parameter
    })
}
