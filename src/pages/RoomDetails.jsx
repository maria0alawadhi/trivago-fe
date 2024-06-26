import '../App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import { useParams } from 'react-router-dom'
import RoomDetail from '../components/RoomDetail'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
const RoomDetails = ({ user }) => {
  const [room, setRoom] = useState(null)
  const { hotelid, roomid } = useParams()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    try {
      await Client.post(`/hotels/${hotelid}/rooms/${roomid}`, {
        room: roomid,
        checkIn,
        checkOut,
        user: user.id
      })
      navigate('/reservations')
    } catch (error) {
      console.error('Error making reservation:', error)
    }
  }

  useEffect(() => {
    const getRoom = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/hotels/${hotelid}/rooms/${roomid}`
        )
        setRoom(response.data)
      } catch (error) {
        console.log('Error Connecting', error)
      }
    }

    getRoom()
  }, [hotelid, roomid])

  if (!room) {
    return null
  }

  return (
    <div className="Room-detail">
      <div className="room">
        <RoomDetail
          room={room}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          handleSubmit={handleSubmit}
          user={user}
        />
      </div>
    </div>
  )
}

export default RoomDetails
