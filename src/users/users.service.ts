import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database.service';
import { ResultSetHeader } from 'mysql2';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(private readonly dbService: DatabaseService) { }

  async getAllUsers() {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('SELECT * FROM User');
    return rows;
  }

  async findOne(id: number) {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('SELECT * FROM User WHERE id = ?', [id]);
    return rows;
  }

  async createUser(user: User) {
    const connection = this.dbService.getConnection();
    const [result] = await connection.query<ResultSetHeader>('INSERT INTO User SET?', user);
    return { id: result.insertId, ...user };
  }


  async updateUser(id: number, user: User,) {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('UPDATE User SET? WHERE id =?', [user, id]);
    return [user, rows];
  }


  async removeUser(id: number) {
    const connection = this.dbService.getConnection();
    const [rows] = await connection.query('DELETE FROM User WHERE id =?',id);
    return [rows];
  }
}
