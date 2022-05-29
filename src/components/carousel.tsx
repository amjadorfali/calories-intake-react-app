import React, { PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Button, Grid, Slide } from '@mui/material';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { useState } from 'react';
import { useTransition } from 'react';

const CAROUSEL_CHUNK = 2;

const _itemsObjBuilder = (itemsList: {}[]) => {
  let itemsObj = {};

  for (let i = 0, index = 1, j = itemsList.length; i < j; i += CAROUSEL_CHUNK, index++) {
    itemsObj = { ...itemsObj, [`${index}`]: itemsList.slice(i, i + CAROUSEL_CHUNK) };
  }

  return itemsObj;
};

interface Props<ObjectType> {
  items: ObjectType[];
  renderItem(item: ObjectType, key: number): JSX.Element;
  width?: string;
}

export function CustomCarousel<ObjectType>({ items, renderItem, width }: PropsWithChildren<Props<ObjectType>>) {
  const [selectedPage, setSelectedPage] = useState(1);
  const carouselObj = React.useMemo<{ [key: number]: ObjectType[] }>(() => _itemsObjBuilder(items), [items]);
  const [isExiting, setIsExiting] = useState({ exiting: false, nextNumber: 1 });
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const startTransition = useTransition()[1];

  const nextItems = () => {
    const nextPage = selectedPage + 1;
    setDirection('right');
    startTransition(() => setIsExiting({ exiting: true, nextNumber: nextPage }));
  };

  const previousItems = () => {
    const previousPage = selectedPage - 1;
    setDirection('left');
    startTransition(() => setIsExiting({ exiting: true, nextNumber: previousPage }));
  };

  const hideNextBtn = selectedPage <= Object.keys(carouselObj).length - 1;
  const hidePrevBtn = selectedPage > 1;

  useEffect(() => {
    if (!carouselObj[selectedPage]) setSelectedPage((prev) => prev - 1);
  }, [items, carouselObj, selectedPage]);
  return (
    <Wrapper container item xs={12} width={width}>
      <ItemWrapper item xs={12}>
        {carouselObj[selectedPage] &&
          carouselObj[selectedPage].map((itemToRender, index) => (
            <Slide
              onExited={() => {
                startTransition(() => {
                  setDirection(isExiting.nextNumber > selectedPage ? 'left' : 'right');
                  setSelectedPage(isExiting.nextNumber);
                  setIsExiting((prev) => {
                    return { ...prev, exiting: false };
                  });
                });
              }}
              in={!isExiting.exiting}
              direction={direction}
              mountOnEnter
              timeout={{ enter: 600, exit: 500, appear: 700 }}
              //@ts-ignore
              key={`${itemToRender.id}-slide`}
            >
              {renderItem(itemToRender, index)}
            </Slide>
          ))}
      </ItemWrapper>

      <NavButtons item xs={12} container width={'100%'} justifyContent="space-around">
        <Slide in={hidePrevBtn} direction="left">
          <NumberButton sx={{ alignSelf: 'end' }} variant={'contained'} color={'secondary'} size="small" onClick={previousItems}>
            <ChevronLeftIcon />
          </NumberButton>
        </Slide>
        <Slide in={hideNextBtn} direction="right">
          <NumberButton sx={{ alignSelf: 'end' }} variant={'contained'} color={'secondary'} size="small" onClick={nextItems}>
            <ChevronRightIcon />
          </NumberButton>
        </Slide>
      </NavButtons>
    </Wrapper>
  );
}

const NavButtons = styled(Grid)`
  margin-bottom: 3rem;
  min-height: 6rem;
`;
const Wrapper = styled(Grid)<{ width?: string | undefined }>`
  display: flex;
  width: ${({ width }) => (width ? `${width};` : `60%;`)}
  align-items: center;
  justify-content: center;
  overflow : hidden;
`;

const ItemWrapper = styled(Grid)`
  height: fit-content;
  min-height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 100%;
`;

const NumberButton = styled(Button)`
  padding: 0.5rem;
`;
