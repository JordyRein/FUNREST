export class Reservation{
  constructor(bid, Customer, Room, staytime, start, end, review){
    this.BookingId = bid
    this.Customer = Customer;
    this.Room = Room;
    this.Staytime = staytime
    this.StartDate = start;
    this.EndDate = end;
    this.Review = review
  }
}
