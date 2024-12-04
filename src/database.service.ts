import { Injectable, Logger } from '@nestjs/common';
import { createConnection, Connection } from 'mysql2/promise';

@Injectable()
export class DatabaseService {
  // Property to hold the connection to MySQL database
  private connection: Connection; 
  // Logger instance
  private readonly logger = new Logger(DatabaseService.name); 

  // Call the connect method when an instance of DatabaseService is created
  constructor() {
    this.connect(); 
  }

  private async connect() {
    try {
      // Attempt to create a connection to MySQL
      this.connection = await createConnection({
        host: 'db',
        user: 'root',
        password: 'password',
        database: 'mydb',
      });
      // Log a message if the connection is successful
      this.logger.log('Connected to MySQL database'); 
    } catch (error) {
      // Log an error message if the connection fails
      this.logger.error('Error connecting to MySQL database', error.stack); 
    }
  }

  getConnection(): Connection {
    // return the connection to MySQL
    return this.connection; 
  }
}