import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Clear existing data first
  await knex('students').del();
  
  // Insert sample students
  await knex('students').insert([
    {
      name: 'Emma Johnson',
      email: 'emma.johnson@university.edu',
      graduation_year: 2024,
      phone_number: '(555) 123-4567',
      gpa: 3.85,
      city: 'New York',
      state: 'NY',
      latitude: 40.7128,
      longitude: -74.0060
    },
    {
      name: 'Michael Chen',
      email: 'michael.chen@university.edu',
      graduation_year: 2025,
      phone_number: '(555) 234-5678',
      gpa: 3.92,
      city: 'San Francisco',
      state: 'CA',
      latitude: 37.7749,
      longitude: -122.4194
    },
    {
      name: 'Sarah Williams',
      email: 'sarah.williams@university.edu',
      graduation_year: 2024,
      phone_number: '(555) 345-6789',
      gpa: 3.67,
      city: 'Chicago',
      state: 'IL',
      latitude: 41.8781,
      longitude: -87.6298
    },
    {
      name: 'James Rodriguez',
      email: 'james.rodriguez@university.edu',
      graduation_year: 2026,
      phone_number: '(555) 456-7890',
      gpa: 3.78,
      city: 'Austin',
      state: 'TX',
      latitude: 30.2672,
      longitude: -97.7431
    },
    {
      name: 'Ashley Davis',
      email: 'ashley.davis@university.edu',
      graduation_year: 2025,
      phone_number: '(555) 567-8901',
      gpa: 3.95,
      city: 'Seattle',
      state: 'WA',
      latitude: 47.6062,
      longitude: -122.3321
    },
    {
      name: 'David Thompson',
      email: 'david.thompson@university.edu',
      graduation_year: 2024,
      phone_number: '(555) 678-9012',
      gpa: 3.23,
      city: 'Miami',
      state: 'FL',
      latitude: 25.7617,
      longitude: -80.1918
    },
    {
      name: 'Jennifer Lee',
      email: 'jennifer.lee@university.edu',
      graduation_year: 2027,
      phone_number: '(555) 789-0123',
      gpa: 3.89,
      city: 'Denver',
      state: 'CO',
      latitude: 39.7392,
      longitude: -104.9903
    },
    {
      name: 'Robert Anderson',
      email: 'robert.anderson@university.edu',
      graduation_year: 2025,
      phone_number: '(555) 890-1234',
      gpa: 3.56,
      city: 'Boston',
      state: 'MA',
      latitude: 42.3601,
      longitude: -71.0589
    },
    {
      name: 'Lisa Garcia',
      email: 'lisa.garcia@university.edu',
      graduation_year: 2026,
      phone_number: '(555) 901-2345',
      gpa: 3.71,
      city: 'Phoenix',
      state: 'AZ',
      latitude: 33.4484,
      longitude: -112.0740
    },
    {
      name: 'Kevin Brown',
      email: 'kevin.brown@university.edu',
      graduation_year: 2024,
      phone_number: '(555) 012-3456',
      gpa: 3.44,
      city: 'Portland',
      state: 'OR',
      latitude: 45.5152,
      longitude: -122.6784
    }
  ]);
}

export async function down(knex: Knex): Promise<void> {
  // Remove all seed data
  await knex('students').del();
}

