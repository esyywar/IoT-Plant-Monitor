import React, { useState } from 'react'

import PropTypes, { InferProps } from 'prop-types'

import { useTypedSelector } from '../../../reducers'
import { useDispatch } from 'react-redux'
import { updateSetpoint } from '../../../actions/plantControl'

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	DialogContentText,
	TextField,
	Button,
	Typography,
} from '@material-ui/core/'

type SetpointForm = {
	setpoint: number
}

export default function UpdateSetpointModal({
	isOpen,
	handleClose,
}: InferProps<typeof UpdateSetpointModal.propTypes>) {
	const dispatch = useDispatch()

	/* Need plantId to update setpoint */
	const plantId = useTypedSelector((state) => state.activePlantState.activePlant.plantId)
	const currSetpoint = useTypedSelector(
		(state) => state.plantControlState.control.soilMoisture.setpoint
	)

	const initialState: SetpointForm = { setpoint: currSetpoint }

	const [formData, setFormData] = useState<SetpointForm>(initialState)

	function handleInputChange(event: any) {
		setFormData({ ...formData, [event.target.name]: event.target.value })
	}

	function submitNameChange() {
		dispatch(updateSetpoint({ plantId, setpoint: formData.setpoint }))
		handleClose()
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="update-setpoint-modal"
			aria-describedby="form-to-update-soil-moisture-setpoint"
			fullWidth
		>
			<DialogTitle id="form-dialog-title">Update Soil Moisture Setpoint</DialogTitle>
			<DialogContent>
				<DialogContentText>What soil moisture setpoint would you like?</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="name"
					label="Soil Moisture Setpoint"
					type="text"
					name="setpoint"
					color="primary"
					placeholder={`${currSetpoint}`}
					fullWidth
					onChange={handleInputChange}
					required
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={submitNameChange} color="primary" type="submit">
					<Typography color="textSecondary">Update Setpoint</Typography>
				</Button>
				<Button onClick={handleClose} color="primary">
					<Typography color="textSecondary">Cancel</Typography>
				</Button>
			</DialogActions>
		</Dialog>
	)
}

UpdateSetpointModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
}
