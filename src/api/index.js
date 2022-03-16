import request from '@/utils/request'


/**
 * 登录
 * @param {*} data 
 * @returns 
 */
export function login(data) {
    return request({
        url: '/v1/front/auth/login',
        method: 'post',
        data
    })
}


/**
 * 用户信息
 * @param {*} params 
 * @returns 
 */
export function getInfo(params) {
    return request({
        url: '/v1/front/user/info',
        method: 'get',
        params
    })
}

/**
 * 其他人中奖历史
 * @param {*} params 
 * @returns 
 */
export function otherDrawList(params) {
    return request({
        url: '/v1/front/other-draw-list',
        method: 'get',
        params
    })
}


/**
 * 可用商品列表
 * @param {*} params 
 * @returns 
 */
export function shopList(params) {
    return request({
        url: '/v1/front/product',
        method: 'get',
        params
    })
}

/**
 * 玩法介绍
 * @returns 
 */
export function play() {
    return request({
        url: '/v1/front/play-introduct',
        method: 'get',
    })
}

/**
 * 中奖历史列表
 * @returns 
 */
export function history(params) {
    return request({
        url: '/v1/front/draw-history',
        method: 'get',
        params
    })
}

/**
 * 抽奖
 * @returns 
 */
export function draw(data) {
    return request({
        url: '/v1/front/draw',
        method: 'post',
        data
    })
}


/**
 * 抽大奖
 * @param {*} data 
 * @returns 
 */
export function drawBig(data) {
    return request({
        url: '/v1/front/draw-big',
        method: 'post',
        data
    })
}