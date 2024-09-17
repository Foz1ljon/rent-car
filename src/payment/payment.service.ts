import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, getManager } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './entities/payment.entity';
import { User } from 'src/users/entities/user.entity';
import { Bron } from 'src/bron/entities/bron.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Bron)
    private readonly bronRepository: Repository<Bron>,
  ) {}

  async createPayment(
    userId: number,
    bronId: number,
  ): Promise<Payment> {
    return await getManager().transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Validate that the user exists
        const user = await transactionalEntityManager.findOne(User, {
          where: { id: userId }, // Specify the search criteria
          relations: ['someRelation'], // Specify relations to load
        });
        if (!user) {
          throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Validate that the booking exists
        const bron = await transactionalEntityManager.findOne(Bron, {
          where: { id: bronId },
        });
        if (!bron) {
          throw new NotFoundException(`Booking with ID ${bronId} not found`);
        }

        // Create a new Payment entity
        const payment = this.paymentRepository.create({
          user, // Set the user relationship
          bron, // Set the booking relationship
        });

        try {
          // Save the payment within a transaction
          return await transactionalEntityManager.save(Payment, payment);
        } catch (error) {
          // Handle potential conflicts or errors
          throw new ConflictException('Failed to create payment');
        }
      },
    );
  }

  async findAllPayments(): Promise<Payment[]> {
    return this.paymentRepository.find({ relations: ['user', 'bron'] });
  }

  async findPaymentById(id: number): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: ['user', 'bron'],
    });
    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }
    return payment;
  }

  // You can add more methods here for updating, deleting, etc.
}
