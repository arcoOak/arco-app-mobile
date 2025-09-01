
import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Button from '../buttons/Button';
import styles from './TarjetaProgress.styles';

const TarjetaProgress = ({ percentage }) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <View style={styles.section}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.circle}>
                        <Svg width={100} height={100} style={{ transform: [{ rotate: '-90deg' }] }}>
                            <Circle
                                stroke="#e6e6e6"
                                strokeWidth={6}
                                fill="transparent"
                                r={radius}
                                cx={50}
                                cy={50}
                            />
                            <Circle
                                stroke="#4070f4"
                                strokeWidth={6}
                                fill="transparent"
                                r={radius}
                                cx={50}
                                cy={50}
                                strokeDasharray={circumference}
                                strokeDashoffset={strokeDashoffset}
                                strokeLinecap="round"
                            />
                        </Svg>
                        <Text style={styles.percentage}>{percentage}%</Text>
                    </View>
                    <View style={styles.info}>
                        <Text style={styles.title}>Puntos Acumulados</Text>
                        <Text style={styles.description}>Canjea tus Recompensas</Text>
                        <Button className="primary" style={styles.progressButton}>
                            Canjear
                        </Button>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default TarjetaProgress;