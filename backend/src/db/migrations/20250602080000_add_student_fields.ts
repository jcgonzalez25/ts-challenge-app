import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('students', (table) => {
    // Required Fields from Challenge
    table.string('email', 255).notNullable().unique();
    table.integer('graduation_year').notNullable();
    table.string('phone_number', 20).notNullable();
    table.decimal('gpa', 3, 2).notNullable().checkBetween([0, 4]);
    
    // Optional Bonus Fields from Challenge
    table.string('city', 100).nullable();
    table.string('state', 50).nullable();
    table.decimal('latitude', 10, 7).nullable();
    table.decimal('longitude', 10, 7).nullable();
    
    // Add indexes for better query performance
    table.index(['graduation_year'], 'idx_students_graduation_year');
    table.index(['gpa'], 'idx_students_gpa');
    table.index(['city', 'state'], 'idx_students_location');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('students', (table) => {
    // Remove indexes first (order matters!)
    table.dropIndex(['graduation_year'], 'idx_students_graduation_year');
    table.dropIndex(['gpa'], 'idx_students_gpa');
    table.dropIndex(['city', 'state'], 'idx_students_location');
    
    // Remove columns
    table.dropColumn('email');
    table.dropColumn('graduation_year');
    table.dropColumn('phone_number');
    table.dropColumn('gpa');
    table.dropColumn('city');
    table.dropColumn('state');
    table.dropColumn('latitude');
    table.dropColumn('longitude');
  });
} 