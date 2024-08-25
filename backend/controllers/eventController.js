const getEvents = (req, res) => {
    // DB에서 이벤트 정보 가져오기
    res.json({ message: '이벤트 정보를 반환합니다.' });
};

module.exports = { getEvents };
