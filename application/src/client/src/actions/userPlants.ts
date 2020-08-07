import { LOAD_PLANTS, ADD_PLANT, REMOVE_PLANT, CLEAR_PLANTS } from './types'

import { setAuthToken } from './setAuthToken'

import { setAlert } from './alerts'

import axios from 'axios'

/************************ ACTION TYPES ***************************/

export type loadPlantsType = {
	type: 'LOAD_PLANTS'
	payload: Array<{
		name: string
		plantId: string
	}>
}

export type addPlantType = {
	type: 'ADD_PLANT'
	payload: Array<{
		name: string
		plantId: string
	}>
}

/* Payload is plant's id */
export type removePlantType = {
	type: 'REMOVE_PLANT'
	payload: string
}

export type clearPlantsType = {
	type: 'CLEAR_PLANTS'
}

/**************************** ACTIONS ********************************/

/* Load plants registered to a logged in user's account */
export const loadUserPlants = () => async (dispatch: Function) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}

	try {
		const res = await axios.get('/api/user/plants')

		const action: loadPlantsType = {
			type: LOAD_PLANTS,
			payload: res.data.plants.map((item: any) => {
				return {
					name: item.name,
					plantId: item.plant,
				}
			}),
		}

		dispatch(action)
	} catch (error) {
		dispatch(clearUserPlants())

		const errors = error.response.data.errors

		errors.forEach((error: any) => dispatch(setAlert(error.msg, 'error')))
	}
}

/* Add a plant by id to the user's account */
export const addUserPlant = (plantId: string) => async (dispatch: Function) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}

	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	}

	try {
		const res = await axios.put(`/api/user/plant/${plantId}`, config)

		const action: addPlantType = {
			type: ADD_PLANT,
			payload: res.data.plants.map((item: any) => {
				return {
					name: item.name,
					plantId: item.plant,
				}
			}),
		}

		dispatch(action)
	} catch (error) {
		const errors = error.response.data.errors

		errors.forEach((error: any) => dispatch(setAlert(error.msg, 'error')))
	}
}

/* Remove a plant from user's account by id */
export const removeUserPlant = (plantId: string) => async (dispatch: Function) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}

	try {
		await axios.delete(`/api/user/plant/${plantId}`)

		const action: removePlantType = {
			type: REMOVE_PLANT,
			payload: plantId,
		}

		dispatch(action)
	} catch (error) {
		const errors = error.response.data.errors

		errors.forEach((error: any) => dispatch(setAlert(error.msg, 'error')))
	}
}

/* Clear the userPlants state */
export const clearUserPlants = () => (dispatch: Function) => {
	const action: clearPlantsType = {
		type: CLEAR_PLANTS,
	}

	dispatch(action)
}