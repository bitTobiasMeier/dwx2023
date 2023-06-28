using System.Collections.Concurrent;
using System.Collections.ObjectModel;
using Dinner.Api.Domain;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Dinner.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReservationController
{
    public static ConcurrentDictionary<int,Reservation> Reservations = new ConcurrentDictionary<int, Reservation>();

    public ReservationController()
    {
        if (Reservations.Count == 0)
        {
            var r1 = new Reservation(1, DateTime.Today.AddDays(1).AddHours(18), 1,
                new ReservationContact(new Person("Tobias", "Meier", "032423 32323")),  2);
            Reservations.TryAdd(1,r1);
            var r2 =
                new Reservation(2, DateTime.Today.AddDays(2).AddHours(19), 1,
                    new ReservationContact(new Company("BridgingIT GmbH",
                        new Person("Tobias", "Meier", "032423 32323"))), 15);
            Reservations.TryAdd(2, r2);
        }
    }


    [HttpPost]
    public ActionResult<Reservation> CreateReservation(Reservation reservation)
    {
        var nextReservationId = Reservations.Count == 0 ? 1 : Reservations.Keys.Max(r => r) +1;
        reservation.Id = nextReservationId;
        Reservations.TryAdd(nextReservationId, reservation);
        return reservation;
    }

    [HttpPut]
    public ActionResult<Reservation> UpdateReservation(Reservation reservation)
    {
        var found = Reservations.TryGetValue(reservation.Id!.Value, out var oldreservation);
        if (found && oldreservation != null)
        {
            oldreservation.Contact = reservation.Contact;
            oldreservation.Personcount = reservation.Personcount;
            oldreservation.RestaurantId = reservation.RestaurantId;
            oldreservation.Date = reservation.Date;
        }
        else
        {
            throw new Exception("Not found");
        }
        return oldreservation;
    }


    [HttpDelete]
    public ActionResult<Reservation> DeleteReservation(int reservationId)
    {
        if (Reservations.Remove(reservationId, out var oldReservation))
        {
            return oldReservation;
        }

        throw new Exception("Not found");

    }

    [HttpGet]
    public ActionResult<IEnumerable<Reservation>> GetAll()
    {
        var reservations = Reservations.Values.ToArray();
        return reservations;
    }

    [HttpGet("{reservationId}")]
    public ActionResult<Reservation> Get(int reservationId)
    {
        var found = Reservations.TryGetValue(reservationId, out var reservation);
        if (found && reservation != null)
        {
            return reservation;
        }

        throw new Exception("Not found");
    }
}