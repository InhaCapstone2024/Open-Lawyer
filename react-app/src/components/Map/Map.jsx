import React, { useEffect, useState } from 'react';
import { fetchNearbyLegalInstitutions } from '../../apis/legalInstitution';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Map = () => {
  const [institutions, setInstitutions] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    const getCurrentPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error(error);
          }
        );
      } else {
        console.error('브라우저에서 위치를 불러올 수 없습니다.');
      }
    };
    getCurrentPosition();
  }, []);

  useEffect(() => {
    const getNearbyInstitutions = async () => {
      if (latitude && longitude) {
        try {
          const data = await fetchNearbyLegalInstitutions(longitude, latitude);
          setInstitutions(data.legalInstitutions);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getNearbyInstitutions();
  }, [latitude, longitude]);

  const handleInstitutionClick = (name, lat, lng) => {
    const url = `https://map.kakao.com/link/map/${encodeURIComponent(
      name
    )},${lat},${lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col items-base gap-4 p-3">
      <h2 className="text-xl font-bold">🔎 내 근처 법률 기관 찾기</h2>
      <div className="bg-blue-500 text-white py-2 px-4 rounded-sm w-auto font-medium">
      클릭하여 지도에서 위치를 확인하세요🌍
      </div>
      <ul className="w-full max-w-2xl mt-2 space-y-2">
        {institutions.map((institution) => (
          <li
            key={institution.id}
            className="flex items-start p-3 bg-white border border-gray-300 rounded-lg shadow hover:shadow-m cursor-pointer"
            onClick={() =>
              handleInstitutionClick(
                institution.placeName,
                institution.latitude,
                institution.longitude
              )
            }
          >
            <FaMapMarkerAlt className="text-red-500 text-2xl mr-2" />
            <div className="flex-grow">
              <strong className="text-lg font-semibold">
                {institution.placeName}
              </strong>
              <div className="text-gray-600 font-semibold">
                {institution.roadAddressName}
              </div>
              <span className="text-gray-500 font-medium">
                {institution.phoneNumber || '전화번호 없음'}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Map;
