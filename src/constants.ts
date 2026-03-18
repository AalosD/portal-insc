import { Subject, UserProfile, EnrollmentInfo } from './types';

export const USER_PROFILE: UserProfile = {
  name: "Alonso Domínguez",
  campus: "Casas Grandes",
  progress: 35,
  entryType: "Nuevo ingreso",
  previousAverage: 8.95,
  totalCredits: 120
};

export const ENROLLMENT_INFO: EnrollmentInfo = {
  period: "Enero - Mayo 2026",
  date: "09/06/2025",
  allowedCredits: 60,
  status: "ACTIVO",
  folio: "12345"
};

export const SUBJECTS: Subject[] = [
  {
    id: '1',
    name: "Introducción a la programación",
    code: "PEC-0081-01",
    credits: 10,
    groups: [
      {
        id: '1-A',
        name: 'A',
        teacher: 'Hugo Pérez',
        location: 'ICB-B-209',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 10,
        schedule: [
          { day: 'Lun', start: '07:00', end: '09:00' },
          { day: 'Mié', start: '07:00', end: '09:00' },
          { day: 'Vie', start: '07:00', end: '09:00' }
        ]
      },
      {
        id: '1-B',
        name: 'B',
        teacher: 'Paco López',
        location: 'ICB-B-210',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 15,
        schedule: [
          { day: 'Mar', start: '09:00', end: '11:00' },
          { day: 'Jue', start: '09:00', end: '11:00' }
        ]
      },
      {
        id: '1-C',
        name: 'C',
        teacher: 'Ana Martínez',
        location: 'ICB-B-211',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 5,
        schedule: [
          { day: 'Lun', start: '13:00', end: '15:00' },
          { day: 'Mié', start: '13:00', end: '15:00' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: "Matemáticas para programación",
    code: "PEC-0082-01",
    credits: 8,
    groups: [
      {
        id: '2-A',
        name: 'A',
        teacher: 'Luisa Sáenz',
        location: 'ICB-B-211',
        modality: 'Presencial',
        credits: 8,
        capacity: 30,
        enrolled: 12,
        schedule: [
          { day: 'Lun', start: '11:00', end: '13:00' },
          { day: 'Mié', start: '11:00', end: '13:00' }
        ]
      },
      {
        id: '2-B',
        name: 'B',
        teacher: 'Mario Gómez',
        location: 'ICB-B-212',
        modality: 'Presencial',
        credits: 8,
        capacity: 30,
        enrolled: 20,
        schedule: [
          { day: 'Mar', start: '07:00', end: '09:00' },
          { day: 'Jue', start: '07:00', end: '09:00' }
        ]
      },
      {
        id: '2-C',
        name: 'C',
        teacher: 'Sofía Lara',
        location: 'ICB-B-213',
        modality: 'Presencial',
        credits: 8,
        capacity: 30,
        enrolled: 15,
        schedule: [
          { day: 'Vie', start: '09:00', end: '11:00' },
          { day: 'Sáb', start: '09:00', end: '11:00' }
        ]
      }
    ]
  },
  {
    id: '3',
    name: "Algoritmos",
    code: "PEC-0083-01",
    credits: 10,
    groups: [
      {
        id: '3-A',
        name: 'A',
        teacher: 'Juan Pérez',
        location: 'ICB-B-212',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 8,
        schedule: [
          { day: 'Mar', start: '07:00', end: '09:00' },
          { day: 'Jue', start: '07:00', end: '09:00' }
        ]
      },
      {
        id: '3-B',
        name: 'B',
        teacher: 'Lucía Méndez',
        location: 'ICB-B-213',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 12,
        schedule: [
          { day: 'Lun', start: '09:00', end: '11:00' },
          { day: 'Mié', start: '09:00', end: '11:00' }
        ]
      },
      {
        id: '3-C',
        name: 'C',
        teacher: 'David Ortiz',
        location: 'ICB-B-214',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 10,
        schedule: [
          { day: 'Vie', start: '13:00', end: '15:00' },
          { day: 'Sáb', start: '11:00', end: '13:00' }
        ]
      }
    ]
  },
  {
    id: '4',
    name: "Desarrollo web",
    code: "PEC-0084-01",
    credits: 10,
    groups: [
      {
        id: '4-A',
        name: 'A',
        teacher: 'María García',
        location: 'ICB-B-213',
        modality: 'Presencial',
        credits: 10,
        capacity: 20,
        enrolled: 5,
        schedule: [
          { day: 'Vie', start: '11:00', end: '13:00' },
          { day: 'Sáb', start: '09:00', end: '12:00' }
        ]
      },
      {
        id: '4-B',
        name: 'B',
        teacher: 'Jorge Ramos',
        location: 'ICB-B-214',
        modality: 'Presencial',
        credits: 10,
        capacity: 20,
        enrolled: 18,
        schedule: [
          { day: 'Lun', start: '17:00', end: '19:00' },
          { day: 'Mié', start: '17:00', end: '19:00' }
        ]
      },
      {
        id: '4-C',
        name: 'C',
        teacher: 'Isabel Vega',
        location: 'ICB-B-215',
        modality: 'Presencial',
        credits: 10,
        capacity: 20,
        enrolled: 12,
        schedule: [
          { day: 'Mar', start: '13:00', end: '15:00' },
          { day: 'Jue', start: '13:00', end: '15:00' }
        ]
      }
    ]
  },
  {
    id: '5',
    name: "Estructura de datos",
    code: "PEC-0085-01",
    credits: 10,
    groups: [
      {
        id: '5-A',
        name: 'A',
        teacher: 'Carlos Ruiz',
        location: 'ICB-B-214',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 18,
        schedule: [
          { day: 'Lun', start: '15:00', end: '17:00' },
          { day: 'Mié', start: '15:00', end: '17:00' }
        ]
      },
      {
        id: '5-B',
        name: 'B',
        teacher: 'Beatriz Solis',
        location: 'ICB-B-215',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 10,
        schedule: [
          { day: 'Mar', start: '09:00', end: '11:00' },
          { day: 'Jue', start: '09:00', end: '11:00' }
        ]
      },
      {
        id: '5-C',
        name: 'C',
        teacher: 'Andrés Castro',
        location: 'ICB-B-216',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 5,
        schedule: [
          { day: 'Vie', start: '15:00', end: '17:00' },
          { day: 'Sáb', start: '13:00', end: '15:00' }
        ]
      }
    ]
  },
  {
    id: '6',
    name: "Bases de Datos",
    code: "PEC-0086-01",
    credits: 10,
    groups: [
      {
        id: '6-A',
        name: 'A',
        teacher: 'Elena Torres',
        location: 'ICB-B-215',
        modality: 'Presencial',
        credits: 10,
        capacity: 30,
        enrolled: 22,
        schedule: [
          { day: 'Mar', start: '11:00', end: '13:00' },
          { day: 'Jue', start: '11:00', end: '13:00' }
        ]
      },
      {
        id: '6-B',
        name: 'B',
        teacher: 'Miguel Ángel',
        location: 'ICB-B-216',
        modality: 'Presencial',
        credits: 10,
        capacity: 30,
        enrolled: 15,
        schedule: [
          { day: 'Lun', start: '07:00', end: '09:00' },
          { day: 'Mié', start: '07:00', end: '09:00' }
        ]
      },
      {
        id: '6-C',
        name: 'C',
        teacher: 'Rosa María',
        location: 'ICB-B-217',
        modality: 'Presencial',
        credits: 10,
        capacity: 30,
        enrolled: 10,
        schedule: [
          { day: 'Vie', start: '17:00', end: '19:00' },
          { day: 'Sáb', start: '07:00', end: '09:00' }
        ]
      }
    ]
  },
  {
    id: '7',
    name: "Redes de Computadoras",
    code: "PEC-0087-01",
    credits: 8,
    groups: [
      {
        id: '7-A',
        name: 'A',
        teacher: 'Roberto Méndez',
        location: 'ICB-B-216',
        modality: 'Presencial',
        credits: 8,
        capacity: 25,
        enrolled: 15,
        schedule: [
          { day: 'Lun', start: '09:00', end: '11:00' },
          { day: 'Mié', start: '09:00', end: '11:00' }
        ]
      },
      {
        id: '7-B',
        name: 'B',
        teacher: 'Laura Jiménez',
        location: 'ICB-B-217',
        modality: 'Presencial',
        credits: 8,
        capacity: 25,
        enrolled: 12,
        schedule: [
          { day: 'Mar', start: '17:00', end: '19:00' },
          { day: 'Jue', start: '17:00', end: '19:00' }
        ]
      },
      {
        id: '7-C',
        name: 'C',
        teacher: 'Gabriel Luna',
        location: 'ICB-B-218',
        modality: 'Presencial',
        credits: 8,
        capacity: 25,
        enrolled: 8,
        schedule: [
          { day: 'Vie', start: '11:00', end: '13:00' },
          { day: 'Sáb', start: '09:00', end: '11:00' }
        ]
      }
    ]
  },
  {
    id: '8',
    name: "Ingeniería de Software",
    code: "PEC-0088-01",
    credits: 10,
    groups: [
      {
        id: '8-A',
        name: 'A',
        teacher: 'Patricia Luna',
        location: 'ICB-B-217',
        modality: 'Presencial',
        credits: 10,
        capacity: 20,
        enrolled: 10,
        schedule: [
          { day: 'Mar', start: '15:00', end: '17:00' },
          { day: 'Jue', start: '15:00', end: '17:00' }
        ]
      },
      {
        id: '8-B',
        name: 'B',
        teacher: 'Oscar Wilde',
        location: 'ICB-B-218',
        modality: 'Presencial',
        credits: 10,
        capacity: 20,
        enrolled: 5,
        schedule: [
          { day: 'Lun', start: '11:00', end: '13:00' },
          { day: 'Mié', start: '11:00', end: '13:00' }
        ]
      },
      {
        id: '8-C',
        name: 'C',
        teacher: 'Diana Prince',
        location: 'ICB-B-219',
        modality: 'Presencial',
        credits: 10,
        capacity: 20,
        enrolled: 15,
        schedule: [
          { day: 'Vie', start: '09:00', end: '11:00' },
          { day: 'Sáb', start: '11:00', end: '13:00' }
        ]
      }
    ]
  },
  {
    id: '9',
    name: "Inteligencia Artificial",
    code: "PEC-0089-01",
    credits: 12,
    groups: [
      {
        id: '9-A',
        name: 'A',
        teacher: 'Fernando Silva',
        location: 'ICB-B-218',
        modality: 'Presencial',
        credits: 12,
        capacity: 15,
        enrolled: 5,
        schedule: [
          { day: 'Vie', start: '07:00', end: '10:00' },
          { day: 'Sáb', start: '07:00', end: '10:00' }
        ]
      },
      {
        id: '9-B',
        name: 'B',
        teacher: 'Ada Lovelace',
        location: 'ICB-B-219',
        modality: 'Presencial',
        credits: 12,
        capacity: 15,
        enrolled: 10,
        schedule: [
          { day: 'Mar', start: '09:00', end: '12:00' },
          { day: 'Jue', start: '09:00', end: '12:00' }
        ]
      },
      {
        id: '9-C',
        name: 'C',
        teacher: 'Alan Turing',
        location: 'ICB-B-220',
        modality: 'Presencial',
        credits: 12,
        capacity: 15,
        enrolled: 12,
        schedule: [
          { day: 'Lun', start: '17:00', end: '20:00' },
          { day: 'Mié', start: '17:00', end: '20:00' }
        ]
      }
    ]
  },
  {
    id: '10',
    name: "Seguridad Informática",
    code: "PEC-0090-01",
    credits: 10,
    groups: [
      {
        id: '10-A',
        name: 'A',
        teacher: 'Gabriela Soto',
        location: 'ICB-B-219',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 12,
        schedule: [
          { day: 'Lun', start: '13:00', end: '15:00' },
          { day: 'Mié', start: '13:00', end: '15:00' }
        ]
      },
      {
        id: '10-B',
        name: 'B',
        teacher: 'Kevin Mitnick',
        location: 'ICB-B-220',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 20,
        schedule: [
          { day: 'Mar', start: '15:00', end: '17:00' },
          { day: 'Jue', start: '15:00', end: '17:00' }
        ]
      },
      {
        id: '10-C',
        name: 'C',
        teacher: 'Edward Snowden',
        location: 'ICB-B-221',
        modality: 'Presencial',
        credits: 10,
        capacity: 25,
        enrolled: 15,
        schedule: [
          { day: 'Vie', start: '13:00', end: '15:00' },
          { day: 'Sáb', start: '15:00', end: '17:00' }
        ]
      }
    ]
  }
];
