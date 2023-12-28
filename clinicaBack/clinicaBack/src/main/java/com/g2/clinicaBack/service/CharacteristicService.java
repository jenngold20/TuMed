package com.g2.clinicaBack.service;

import com.g2.clinicaBack.dto.CharacteristicDto;

import java.util.List;

public interface CharacteristicService {
    CharacteristicDto createCharacteristic(CharacteristicDto characteristicDto);
    CharacteristicDto getCharacteristicById(Long characteristicId);
    List<CharacteristicDto> getAllCharacteristics();
    CharacteristicDto updateCharacteristic(Long characteristicId, CharacteristicDto characteristicDto);
    void deleteCharacteristic(Long characteristicId);
}
