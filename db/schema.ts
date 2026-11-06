import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

/** Clientes que pediram para ser chamados por um consultor no WhatsApp. */
export const leads = pgTable('leads', {
  id: serial().primaryKey(),
  name: text().notNull(),
  phone: text().notNull(),
  status: text().notNull().default('novo'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})
