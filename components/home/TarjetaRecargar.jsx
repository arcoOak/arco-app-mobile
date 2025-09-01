
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useAuth } from "../../src/context/AuthContext";
import billeteraService from "../../src/services/billetera.service";
import data_dbService from "../../src/services/data_db.service";
import ModalFormulario from "../modals/ModalFormulario";
import dashboardHomeStyles from '../../src/css/DashboardHome.styles';

export default function TarjetaRecargar() {

    const {user, actualizarSaldoBilletera} = useAuth();

    const [monto, setMonto] = useState(0);
    const [metodosPago, setMetodosPago] = useState([]);
    const [metodoSeleccionado, setMetodoSeleccionado] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchMetodosPago = async () => {
            const metodos = await data_dbService.getMetodosPago();
            setMetodosPago(metodos);
        };
        fetchMetodosPago();
    }, []);

    const recargarSaldo = async () => {
        try {

            const recargarData = {
                id_billetera: user.id_billetera,
                monto: parseFloat(monto), // Establece el monto que deseas recargar
                metodoSeleccionado: parseInt(metodoSeleccionado) // Asegúrate de que sea un número
            }

            console.log('Datos de recarga:', recargarData);

            const response = await billeteraService.recargarSaldo(recargarData);
            console.log('Respuesta de recarga:', response);
            if (response) {
                //Actualizar el saldo en el contexto o estado
                actualizarSaldoBilletera();
            }
        } catch (error) {
            console.error('Error al recargar saldo:', error);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        // Resetea los campos del formulario al cerrar
        setMonto(0);
        setMetodoSeleccionado('');
    };

    const handleModalSubmit = async (event) => {
        // Es una buena práctica prevenir el comportamiento por defecto del formulario.
        if (event) event.preventDefault();
        console.log('Monto a recargar:', monto);
        console.log('Método de pago seleccionado:', metodoSeleccionado);
        
        // Validador: comprueba si los datos son inválidos y sale de la función
        if (!monto || parseFloat(monto) <= 0 || !metodoSeleccionado) {
            console.log("Validación fallida. El modal no debería cerrarse.");
            // Si el modal se sigue cerrando, el problema reside en el componente ModalFormulario,
            // que podría estar llamando a onClose incondicionalmente.
            return;
        }

        await recargarSaldo();
        handleModalClose(); // Cierra y resetea el modal
    };

    return (
        <>
            <ModalFormulario
                visible={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleModalSubmit}
                titulo="Recargar Saldo"
                data={{ monto, metodoSeleccionado }}
            >
                <Text style={styles.label}>Monto:</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={monto.toString()}
                    onChangeText={setMonto}
                    placeholder="Ingrese el monto"
                    min={1}
                />
                <Text style={styles.label}>Método de Pago:</Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={metodoSeleccionado}
                        onValueChange={setMetodoSeleccionado}
                        style={styles.input}
                    >
                        <Picker.Item label="Seleccionar" value="" enabled={false} />
                        {metodosPago.map((metodo) => (
                            <Picker.Item key={metodo.id_metodo_pago} label={metodo.nombre_metodo_pago} value={metodo.id_metodo_pago} />
                        ))}
                    </Picker>
                </View>
            </ModalFormulario>
            <View style={dashboardHomeStyles.balanceSection}>
                <View style={dashboardHomeStyles.balanceActions}>
                    <View style={dashboardHomeStyles.balanceButton}>
                        <TouchableOpacity
                            style={styles.recargarButton}
                            onPress={() => setIsModalOpen(true)}
                            activeOpacity={0.85}
                        >
                            <Icon name="wallet" size={22} color="#1976d2" style={{ marginRight: 8 }} />
                            <Text style={styles.recargarLabel}>Recargar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 10,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  recargarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  recargarLabel: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
  },
});
}
