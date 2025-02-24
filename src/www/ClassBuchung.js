export class Reservation{
  constructor(bid, customer, room, staytime, start, end, review){
    this.BookingId = bid
    this.Customer = customer;
    this.Room = room;
    this.Staytime = staytime
    this.StartDate = start;
    this.EndDate = end;
    this.Review = review
  }
}
