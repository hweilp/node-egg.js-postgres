import { Service } from 'egg';
// import Pg from 'pg';

// const client = new Pg.client('postgres://postgres:root@localhost/cost_record');
/**
 * Test Service
 */
export default class Test extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }
}
