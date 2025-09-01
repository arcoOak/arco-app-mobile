
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FaqsStyles from '../css/Faqs.styles';

const faqs = [
  {
    question: '¿Cómo puedo registrarme en la aplicación?',
    answer: 'Para registrarte, haz clic en el botón "Registrarse" en la pantalla principal y sigue los pasos indicados.'
  },
  {
    question: '¿Puedo usar la app sin conexión a internet?',
    answer: 'Algunas funciones están disponibles sin conexión, pero para acceder a todas necesitarás conexión a internet.'
  },
  {
    question: '¿Cómo contacto con soporte?',
    answer: 'Puedes escribirnos a soporte@tuapp.com y te responderemos lo antes posible.'
  }
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <View style={FaqsStyles.faqItem}>
      <TouchableOpacity
        style={FaqsStyles.faqQuestion}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.85}
      >
        <Text style={{ flex: 1 }}>{question}</Text>
        <Text style={FaqsStyles.faqToggle}>{isOpen ? '–' : '+'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <Text style={FaqsStyles.faqAnswer}>{answer}</Text>
      )}
    </View>
  );
};

const FAQPage = () => {
  return (
    <View style={FaqsStyles.faqContainer}>
      <View style={FaqsStyles.faqContent}>
        <Text style={FaqsStyles.faqTitle}>Preguntas Frecuentes</Text>
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </View>
    </View>
  );
};

export default FAQPage;
